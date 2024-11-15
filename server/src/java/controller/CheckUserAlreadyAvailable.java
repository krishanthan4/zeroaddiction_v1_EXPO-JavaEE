package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import entity.User;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

@WebServlet("/CheckUserAlreadyAvailable")
public class CheckUserAlreadyAvailable extends HttpServlet {

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

            if (checkUserCriteria.list().isEmpty()) {
                responseJson.addProperty("success", true);
            } else {
                responseJson.addProperty("message", "use a different email");
            }

        } catch (Exception e) {
            System.out.println("Error : " + e);
            responseJson.addProperty("message", "Something Went Wrong in server");
        } finally {
            if (session != null) {
                session.close();
            }
            response.getWriter().write(gson.toJson(responseJson));
            System.out.println("CheckUserAlreadyAvailable : " + gson.toJson(responseJson));
        }
    }

}
