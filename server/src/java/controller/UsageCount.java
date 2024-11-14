package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import entity.UsageTracking;
import entity.User;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

@WebServlet("/UsageCount")
public class UsageCount extends HttpServlet{

   @Override
protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    Gson gson = new Gson();
    JsonObject responseJson = new JsonObject();
    responseJson.addProperty("success", false);
    Session session = null;
    
    try {
        JsonObject requestJson = gson.fromJson(request.getReader(), JsonObject.class);
        String email = requestJson.get("email").getAsString();
        session = HibernateUtil.getSessionFactory().openSession();
        Criteria checkUserCriteria = session.createCriteria(User.class);
        checkUserCriteria.add(Restrictions.eq("email", email));

        if (!checkUserCriteria.list().isEmpty()) {
            User userObject = (User) checkUserCriteria.uniqueResult();
            Criteria getUsageCriteria = session.createCriteria(UsageTracking.class);
            getUsageCriteria.add(Restrictions.eq("user", userObject));
            
            Calendar calendar = Calendar.getInstance();
            Date today = calendar.getTime();
            calendar.add(Calendar.MONTH, -3);
            Date threeMonthsAgo = calendar.getTime();
            
            getUsageCriteria.add(Restrictions.between("date", threeMonthsAgo, today));
           List<UsageTracking> usageList = getUsageCriteria.list();

if (!usageList.isEmpty()) {
    responseJson.addProperty("success", true);
    List<Map<String, String>> responseList = new ArrayList<>();

    SimpleDateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd");

    for (UsageTracking usageTracking : usageList) {
        Map<String, String> responseObject = new HashMap<>();
        String formattedDate = dateFormatter.format(usageTracking.getDate());
        responseObject.put("date", formattedDate);
        responseObject.put("count", String.valueOf(usageTracking.getCount()));
        responseList.add(responseObject);
    }
    responseJson.add("message", gson.toJsonTree(responseList));
} else {
    responseJson.addProperty("message", "No usage data found for the given user.");
}

        } else { 
            responseJson.addProperty("message", "Use a different Email.");
        }
    } catch (Exception e) {
        responseJson.addProperty("message", "An error occurred: " + e.getMessage());
        System.out.println("Error: " + e.getMessage());
    } finally {
        if (session != null) session.close();
        response.setContentType("application/json");
        response.getWriter().write(gson.toJson(responseJson));
        System.out.println("Usage Count : " + gson.toJson(responseJson));
    }
}
    
}