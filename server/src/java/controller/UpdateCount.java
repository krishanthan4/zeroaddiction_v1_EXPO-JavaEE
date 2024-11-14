package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import entity.UsageTracking;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.Session;
import entity.User;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Calendar;
import java.util.Date;
import java.util.function.Predicate;
import javax.servlet.annotation.WebServlet;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;

@WebServlet("/UpdateCount")
public class UpdateCount extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Gson gson = new Gson();
        JsonObject responseJson = new JsonObject();
        responseJson.addProperty("success", false);
        Session session = null;
        Transaction transaction = null;

        try {
            session = HibernateUtil.getSessionFactory().openSession();
            transaction = session.beginTransaction();

            // Parse request JSON
            JsonObject requestJson = gson.fromJson(request.getReader(), JsonObject.class);

            String email = requestJson.has("email") ? requestJson.get("email").getAsString().trim() : null;
            int count = requestJson.has("count") ? requestJson.get("count").getAsInt() : -1;

            if (email == null || email.isEmpty()) {
                responseJson.addProperty("message", "Invalid email");
            } else if (count <= 0 || count > 5) {
                responseJson.addProperty("message", "Invalid count");
            } else {
                // Use createCriteria to find the user by email
                Criteria updateCountCriteria = session.createCriteria(User.class);
                updateCountCriteria.add(Restrictions.eq("email", email));

                User user = (User) updateCountCriteria.uniqueResult();

                if (user != null) {
          
LocalDate localDate = LocalDate.now();
Date startOfDay = Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
Calendar calendar = Calendar.getInstance();
calendar.setTime(startOfDay);
calendar.add(Calendar.DAY_OF_MONTH, 1);
calendar.add(Calendar.MILLISECOND, -1);
Date endOfDay = calendar.getTime();
Criteria checkUsageCountDataCriteria = session.createCriteria(UsageTracking.class);
checkUsageCountDataCriteria.add(Restrictions.and(
        Restrictions.eq("user", user),
        Restrictions.between("date", startOfDay, endOfDay)
));

                    if (!checkUsageCountDataCriteria.list().isEmpty()) {
                 UsageTracking usageTracking = (UsageTracking) checkUsageCountDataCriteria.uniqueResult();
                        System.out.println("there are already ");
                       responseJson.addProperty("message", "AlreadyHave");
                        if(usageTracking.getCount() !=5){
                        usageTracking.setCount(count);
                        session.update(usageTracking);
                        }else{
                         responseJson.addProperty("message", "NoNeedToChange");
                        }
                    } else {
                        System.out.println("no there ain't anything");
                        responseJson.addProperty("message", "New");
                        UsageTracking newUsage = new UsageTracking();
                        newUsage.setUser(user);
                        newUsage.setDate(new Date()); // Current date
                        newUsage.setCount(count);
                        session.save(newUsage);
                    }

                    transaction.commit();
                    responseJson.addProperty("success", true);
                } else {
                    responseJson.addProperty("message", "Email not found");
                }
            }
        } catch (Exception e) {
            if (transaction != null) {
                transaction.rollback();  // Rollback on failure
            }
            responseJson.addProperty("message", "An error occurred: " + e.getMessage());
        } finally {
            if (session != null) {
                session.close();
            }
            response.setContentType("application/json");
            response.getWriter().write(gson.toJson(responseJson));
            System.out.println("UpdateCount: " + gson.toJson(responseJson));
        }
    }

}
