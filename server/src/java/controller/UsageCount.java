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

@WebServlet("/usageCount")
public class UsageCount extends HttpServlet{

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
Gson gson = new Gson();
        JsonObject responseJson = new JsonObject();
        responseJson.addProperty("success", false);
        Session session = null;
        
        try {
             JsonObject requestJson = gson.fromJson(request.getReader(), JsonObject.class);
            String mobile = requestJson.get("mobile").getAsString();
            session = HibernateUtil.getSessionFactory().openSession();
            Criteria checkUserCriteria = session.createCriteria(User.class);
            checkUserCriteria.add(Restrictions.eq("mobile", mobile));

            if (checkUserCriteria.list().isEmpty()) {
                responseJson.addProperty("success", true);
            } else {
                responseJson.addProperty("message", "use a different mobile number");
            }
        } catch (Exception e) {
        
        } finally {
        
        }
    }
    
}
