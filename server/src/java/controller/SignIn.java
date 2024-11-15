package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import entity.User;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

@WebServlet("/SignIn")
public class SignIn extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Gson gson = new Gson();
        JsonObject responseJson = new JsonObject();
        responseJson.addProperty("success", false);
        Session session = null;

        try {
            JsonObject requestJson = gson.fromJson(request.getReader(), JsonObject.class);

            String username = requestJson.has("username") ? requestJson.get("username").getAsString() : null;
            String password = requestJson.has("password") ? requestJson.get("password").getAsString() : null;

            // Validate parameters
            if (username == null || username.isEmpty()) {
                responseJson.addProperty("message", "Please Enter Your Username");
            } else if (password == null || password.isEmpty()) {
                responseJson.addProperty("message", "Please Enter Your Password");
            } else {
                // Open Hibernate session
                session = HibernateUtil.getSessionFactory().openSession();

               
                // Create Criteria for querying
                Criteria searchUserCriteria = session.createCriteria(User.class);
                searchUserCriteria.add(Restrictions.eq("username", username));
                searchUserCriteria.add(Restrictions.eq("password", password));

                User searchedUser = (User) searchUserCriteria.uniqueResult();

                if (searchedUser == null) {
                    responseJson.addProperty("message", "Invalid username or password.");
                } else {
                    responseJson.addProperty("success", true);
                    responseJson.add("message", gson.toJsonTree(searchedUser));
                    request.getSession().setAttribute("ControlUser", username);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            responseJson.addProperty("message", "Something went wrong on the server.");
        } finally {
            if (session != null) {
                session.close();
            }
            response.setContentType("application/json");
            response.getWriter().write(gson.toJson(responseJson));
            System.out.println(gson.toJson(responseJson));
        }
    }

}
