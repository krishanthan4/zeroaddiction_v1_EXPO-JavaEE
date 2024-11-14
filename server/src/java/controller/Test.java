package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.HibernateUtil;
import org.hibernate.Session;

@WebServlet("/Test")
public class Test extends HttpServlet{
    @Override
protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    Gson gson = new Gson();
//    JsonObject responseJson = new JsonObject();
//    responseJson.addProperty("success", false);
//    Session session = null;
//
//    try {
//        session = HibernateUtil.getSessionFactory().openSession();
//
//        String hql = "SELECT u.user_email.email, u.date, u.count "
//                + "FROM UsageTracking u "
//                + "WHERE u.date <= :currentDate "
//                + "ORDER BY u.user_email.email, u.date DESC";
//
//        org.hibernate.Query query = session.createQuery(hql);
//        query.setParameter("currentDate", new Date());
//        List<Object[]> resultList = query.list();
//        List<HashMap<String, String>> outputList = new ArrayList<>();
//
//        if (!resultList.isEmpty()) {
//            String currentUser = null;
//            Date previousDate = null;
//            int streakGroup = 0;
//            Date streakStartDate = null;
//            Date streakEndDate = new Date();
//            int totalCount = 0;
//
//            for (Object[] row : resultList) {
//                String userEmail = (String) row[0];
//                Date date = (Date) row[1];
//                int count = (int) row[2];
//
//                if (currentUser == null || !currentUser.equals(userEmail)) {
//                    currentUser = userEmail;
//                    streakGroup = 1;
//                    streakStartDate = date;
//                    totalCount = count;
//                } else {
//                    long diffDays = (previousDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
//                    if (diffDays == 1) {
//                        streakGroup++;
//                        totalCount += count;
//                    } else {
//                        break;
//                    }
//                }
//                previousDate = date;
//            }
//
//            if (streakStartDate != null) {
//                streakEndDate = previousDate;
//            }
//
//            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
//
//            HashMap<String, String> singleObject = new HashMap<>();
//            singleObject.put("streakStartDate", dateFormat.format(streakStartDate));
//            singleObject.put("streakEndDate", dateFormat.format(streakEndDate));
//            singleObject.put("userEmail", currentUser);
//            singleObject.put("totalCount", String.valueOf(totalCount));
//            outputList.add(singleObject);
//            responseJson.add("message", gson.toJsonTree(outputList));
//
//        } else {
//            responseJson.addProperty("message", "No streak found ending today.");
//        }
//    } catch (Exception e) {
//        responseJson.addProperty("message", "An error occurred: " + e.getMessage());
//        System.out.println("Error: " + e.getMessage());
//    } finally {
//        if (session != null) {
//            session.close();
//        }
//        response.setCrontentType("application/json");
//        response.getWriter().write(gson.toJson(responseJson));
//        System.out.println("Usage Count: " + gson.toJson(responseJson));
//    }

        try {
            LocalDate localDate = LocalDate.now();
Date date2 = Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
response.getWriter().write(gson.toJson(date2 + " :: " + localDate));
System.out.println(gson.toJson(date2 + " :: " + localDate));
        } catch (Exception e) {
            System.out.println("something went wrong");
        }
}
}
