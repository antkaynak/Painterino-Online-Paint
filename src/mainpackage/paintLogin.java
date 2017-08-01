package mainpackage;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/*
    Made by Ant Kaynak - github.com/Exercon
 */

@WebServlet(name = "paintLogin", urlPatterns = {"/paintLogin"})
public class paintLogin extends HttpServlet {


    @Resource(name="jdbc/antorino")
    private javax.sql.DataSource DataSource;

    /*
    If you must override dbcp, add the code below to the data source.

    factory="org.apache.commons.dbcp.BasicDataSourceFactory"

    e.g While I was using elasticbeanstalk I needed to override It's dbcp factory.
    And I used the code above. But while I was testing local, I had to remove it.

     */

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");

        if(username == null || password == null){
            request.setAttribute("error","Please fill out the form to log-in! ");
            request.getRequestDispatcher("login.jsp").forward(request,response);
            return;
        }

        try {
            Connection conn = DataSource.getConnection();
            String sql = "SELECT UserID FROM users where Username = ? and UserPassword = ?";
            PreparedStatement preparedStmt = conn.prepareStatement(sql);
            preparedStmt.setString (1, username);
            preparedStmt.setString (2, password);
            ResultSet rs = preparedStmt.executeQuery();

            if(rs.next()){
                HttpSession session = request.getSession();
                session.setAttribute("username", username);
                session.setAttribute("password", password);
                paintControllerServlet.mainList.add(new paintControllerUser(username));
                session.setMaxInactiveInterval(3*60);
                request.getRequestDispatcher("WEB-INF/index.jsp").forward(request,response);
            }else{
                request.setAttribute("error","Invalid username or password! ");
                request.getRequestDispatcher("login.jsp").forward(request,response);
            }


        } catch (SQLException e) {
           request.setAttribute("error","An error occurred. Please try again! ");
           request.getRequestDispatcher("login.jsp").forward(request,response);
        }




    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {


        String username = request.getParameter("username");
        String password = request.getParameter("password");
        String email = request.getParameter("email");

        if(username == null || password == null || email == null){
            request.setAttribute("error","Please fill out the form to log-in! ");
            request.getRequestDispatcher("login.jsp").forward(request,response);
            return;
        }

        try {

            Connection conn = DataSource.getConnection();
            String sql = "INSERT INTO Users(Username, UserPassword, UserEmail) VALUES(?,?,?)";
            PreparedStatement preparedStmt = conn.prepareStatement(sql);
            preparedStmt.setString (1, username);
            preparedStmt.setString (2, password);
            preparedStmt.setString (3, email);
            preparedStmt.executeUpdate();
            request.setAttribute("error","You have successfully signed up!");
            request.getRequestDispatcher("login.jsp").forward(request,response);


        } catch (SQLException e) {
           request.setAttribute("error","An error occurred. Please try again! ");
           request.getRequestDispatcher("login.jsp").forward(request,response);
        }
    }
}
