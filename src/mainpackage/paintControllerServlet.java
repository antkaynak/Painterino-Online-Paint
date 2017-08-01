package mainpackage;

import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/*
    Made by Ant Kaynak - github.com/Exercon

 */

@WebServlet(name = "paintControllerServlet", urlPatterns = {"/paintControllerServlet"})
public class paintControllerServlet extends HttpServlet {



    static List<paintControllerUser> mainList = new ArrayList<paintControllerUser>();

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        paintControllerUser activeUser = null;
        String userName = (String) request.getSession().getAttribute("username");
        for(paintControllerUser i : mainList){
            if(i.getUsername().equals(userName)){
                activeUser = i;
            }
        }

        String[] myJsonData = request.getParameterValues("json[]");
        activeUser.storeData(myJsonData);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        List<String> combineList = new ArrayList<String>();
        for(paintControllerUser i : mainList){
            combineList.addAll(i.getList());
        }
        String json = new Gson().toJson(combineList);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(json);
    }




}
