package mainpackage;


import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/*
    Made by Ant Kaynak - github.com/Exercon

 */

@WebServlet(name = "paintUtility", urlPatterns = {"/paintUtility"})
public class paintUtility extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //Executes the clean command.
        //Only the session who asked to delete data will perform this.
        String userName = (String) request.getSession().getAttribute("username");
        for(paintControllerUser i : paintControllerServlet.mainList){
                if(i.getUsername().equals(userName)){
                    i.cleanData();
                }
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
