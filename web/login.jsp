
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Painterino | Welcome</title>
    <link rel='stylesheet' href='css/login.css'>
    <link rel='shortcut icon' href='favicon.ico?' type='image/x-icon'>
    <link rel='icon' href='favicon.ico?' type='image/x-icon'>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Made by Ant Kaynak - github.com/Exercon -->
</head>
<body>

<%

    //A simple check if the user is already logged-in.
    //This is not a proper way. I did this to keep things simple.
    //You usually want to check the database or use Filters.
    String username = (String) session.getAttribute("username");
    String password = (String) session.getAttribute("password");
    if(username != null && password != null){
       request.getRequestDispatcher("WEB-INF/index.jsp").forward(request,response);
    }

%>

<div class='login-page'>
    <div class='form'>
        <form class='register-form' action='<%=request.getContextPath()%>/paintLogin'>
            <input type='text' placeholder='Username' name='username'/>
            <input type='password' placeholder='Password' name='password'/>
            <input type='text' placeholder='E-mail Address' name='email'/>
            <button type='submit' value='Submit'>Register</button>
            <p class='message switch'>Already registered? <a href='#'>Sign In</a></p>
        </form>
        <form class='login-form' action='<%=request.getContextPath()%>/paintLogin' method='post'>
            <%
                //Displaying error or sign-up message.
                //You can achieve this via javascript as well.
                String check = (String) request.getAttribute("error");
                if(check != null){
                    out.println("<p style='color = red'>"+check+"</p>");
                }
            %>
            <input type='text' placeholder='Username' name='username'/>
            <input type='password' placeholder='Password' name='password'/>
            <button type='submit' value='Submit'>Login</button>
            <p class='message switch'>Not registered? <a href='#'>Create an account</a></p>
            <p class='message'>Try <a href='#' id='go-offline'>offline mode </a></p>
        </form>
    </div>
</div>

<footer>
    <div>
       <p> &copy Ant Kaynak | Painterino 2017 </p>
    </div>
</footer>

<script src='scripts/jquery-3.2.1.min.js'></script>
<script>
    $('.switch a').click(function(){
        $('form').animate({height: 'toggle', opacity: 'toggle'}, 'slow');
    });

    $('#go-offline').on('click',function(){
        window.location.replace(document.location.href+"index_offline.jsp");
    });
</script>
</body>
</html>
