package mainpackage;

import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/*
    Made by Ant Kaynak - github.com/Exercon

 */

@WebServlet(name = "paintSessionServlet", urlPatterns = {"/paintSessionServlet"})
public class paintSessionServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
       //Terminates the servlet. Respond to exit command.
        request.getSession().invalidate();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //Coordinates the online list
        Map<HttpSession, String> sessions = SessionCounter.getInstance(getServletContext()).getList();

        List<HttpSession> list = new ArrayList<HttpSession>(sessions.keySet());

        List<String> outList = new ArrayList<String>();
        for(HttpSession i : list){
            if((String) i.getAttribute("username") != null) {
                outList.add((String) i.getAttribute("username"));
            }
        }

        String json = new Gson().toJson(outList);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(json);
    }
}
