package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import entity.UsageTracking;
import entity.User;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.persistence.Query;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.Session;

@WebServlet("/LeaderBoard")
public class LeaderBoard extends HttpServlet {

@Override
protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    Gson gson = new Gson();
    JsonObject responseJson = new JsonObject();
    responseJson.addProperty("success", false);
    Session session = null;

    try {
        session = HibernateUtil.getSessionFactory().openSession();

        // Query to retrieve all usage tracking data, ordered by email and date descending
        String hql = "SELECT u.user.email, u.date, u.count " +
                     "FROM UsageTracking u " +
                     "WHERE u.date <= :currentDate " +
                     "ORDER BY u.user.email, u.date DESC";

        org.hibernate.Query query = session.createQuery(hql);
        query.setParameter("currentDate", new Date());
        List<Object[]> resultList = query.list();

        Map<String, HashMap<String, String>> latestStreakMap = new HashMap<>(); // Store the latest streak for each user

        if (!resultList.isEmpty()) {
            String currentUser = null;
            Date streakStartDate = null;
            Date streakEndDate = null;
            Date previousDate = null;
            int streakDays = 0;
            int totalUsageCount = 0;

            for (Object[] row : resultList) {
                String userEmail = (String) row[0];
                Date date = (Date) row[1];
                int count = (int) row[2]; // Assuming there's a 'count' column for usage

                // If we encounter a new user or finish processing one user's streaks
                if (currentUser == null || !currentUser.equals(userEmail)) {
                    if (currentUser != null && streakDays >= 2) {
                        // Save the latest valid streak for the previous user
                        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
                        HashMap<String, String> singleObject = new HashMap<>();
                        singleObject.put("userEmail", currentUser);
                        singleObject.put("streakStartDate", dateFormat.format(streakStartDate));
                        singleObject.put("streakEndDate", dateFormat.format(streakEndDate));
                        singleObject.put("totalCount", String.valueOf(totalUsageCount));

                        // Save the most recent streak for the user (only store the first valid streak found)
                        if (!latestStreakMap.containsKey(currentUser)) {
                            latestStreakMap.put(currentUser, singleObject);
                        }
                    }

                    // Start a new streak for the new user
                    currentUser = userEmail;
                    streakStartDate = date;
                    streakEndDate = date;
                    streakDays = 1;
                    totalUsageCount = count; // Reset total usage count for the new user
                } else {
                    // Check for consecutive days and extend the streak if they are consecutive
                    long diffDays = (previousDate != null) ? 
                        (previousDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24) : 0;

                    if (diffDays == 1) {
                        // Extend the streak
                        streakDays++;
                        streakEndDate = previousDate;  // Set the end date to the last consecutive day
                        totalUsageCount += count; // Add up the usage count
                    } else if (streakDays >= 2) {
                        // If the streak is broken and the streak has at least 2 days, save it
                        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
                        HashMap<String, String> singleObject = new HashMap<>();
                        singleObject.put("userEmail", currentUser);
                        singleObject.put("streakStartDate", dateFormat.format(streakStartDate));
                        singleObject.put("streakEndDate", dateFormat.format(streakEndDate));
                        singleObject.put("totalCount", String.valueOf(totalUsageCount));

                        // Save the most recent valid streak for the user (only store the first valid streak found)
                        if (!latestStreakMap.containsKey(currentUser)) {
                            latestStreakMap.put(currentUser, singleObject);
                        }

                        // Stop tracking after finding the latest streak for the current user
                        break;
                    }
                }

                // Update previousDate for the next iteration
                previousDate = date;
            }

            // After looping, handle the last user's streak
            if (currentUser != null && streakDays >= 2) {
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
                HashMap<String, String> singleObject = new HashMap<>();
                singleObject.put("userEmail", currentUser);
                singleObject.put("streakStartDate", dateFormat.format(streakStartDate));
                singleObject.put("streakEndDate", dateFormat.format(streakEndDate));
                singleObject.put("totalCount", String.valueOf(totalUsageCount));

                // Save the most recent valid streak for the last user
                if (!latestStreakMap.containsKey(currentUser)) {
                    latestStreakMap.put(currentUser, singleObject);
                }
            }

            // Convert the final streak map to a list and return it
            List<HashMap<String, String>> streakList = new ArrayList<>(latestStreakMap.values());

            // Send the response
            responseJson.addProperty("success", true);
            responseJson.add("message", gson.toJsonTree(streakList));

        } else {
            responseJson.addProperty("message", "No usage data found.");
        }
    } catch (Exception e) {
        responseJson.addProperty("message", "An error occurred: " + e.getMessage());
        System.out.println("Error: " + e.getMessage());
    } finally {
        if (session != null) {
            session.close();
        }
        response.setContentType("application/json");
        response.getWriter().write(gson.toJson(responseJson));
        System.out.println("Streak Data: " + gson.toJson(responseJson));
    }
}


}
