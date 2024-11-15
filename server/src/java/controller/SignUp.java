package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.Date;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import model.HibernateUtil;
import model.Validations;
import org.hibernate.Session;
import entity.User;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;

@MultipartConfig
@WebServlet("/SignUp")
public class SignUp extends HttpServlet {

@Override
protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    Gson gson = new Gson();
    JsonObject responseJson = new JsonObject();
    responseJson.addProperty("success", false);
    Session session = null;

    try {
        JsonObject requestJson = gson.fromJson(request.getReader(), JsonObject.class);

        String email = requestJson.get("email").getAsString();
        String username = requestJson.get("username").getAsString();
        String password = requestJson.get("password").getAsString();

        // Input validation
        if (requestJson.get("email").getAsString() == null || requestJson.get("email").getAsString().isEmpty()) {
            responseJson.addProperty("message", "Please fill in your email.");
        } else if (requestJson.get("username").getAsString() == null || requestJson.get("username").getAsString().isEmpty()) {
            responseJson.addProperty("message", "Please fill in your username.");
        } else if (!Validations.isEmailValid(email)) {
            responseJson.addProperty("message", "Invalid email format.");
        } else if (requestJson.get("password").getAsString() == null || requestJson.get("password").getAsString().isEmpty()) {
            responseJson.addProperty("message", "Please fill in your password.");
        } else if (!Validations.isPasswordValid(password)) {
            responseJson.addProperty("message", "Invalid password format.");
        } else {
            // Database session handling
            session = HibernateUtil.getSessionFactory().openSession();
            session.beginTransaction();

            // Check if the email already exists in the database
            Criteria criteria = session.createCriteria(User.class);
            criteria.add(Restrictions.eq("email", email));

            if (!criteria.list().isEmpty()) {
                responseJson.addProperty("message", "Email is already used.");
            } else {
                // Create a new User object
                User user = new User();
                user.setEmail(email);
                user.setPassword(password);
                user.setUsername(username);
                session.save(user);
                session.getTransaction().commit();

                responseJson.addProperty("success", true);
                responseJson.addProperty("message", "Registration complete.");
            }
        }
    } catch (Exception e) {
        e.printStackTrace();
        responseJson.addProperty("message", "Failed to create account. Server error occurred.");
    } finally {
        // Send the JSON response
        response.setContentType("application/json");
        response.getWriter().write(gson.toJson(responseJson));
        System.out.println(gson.toJson(responseJson));

        // Close the Hibernate session if open
        if (session != null) {
            session.close();
        }
    }
}

}
