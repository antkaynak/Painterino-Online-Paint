package mainpackage;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;
import java.util.Collections;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/*
    Made by Ant Kaynak - github.com/Exercon
    Huge thanks to BalusC from SO for his post.
    Check it out in this projects main page.
 */

public class SessionCounter implements ServletContextListener, HttpSessionListener, ServletRequestListener {

    private static final String ATTRIBUTE_NAME = "SessionCounter";
    private Map<HttpSession, String> sessions = new ConcurrentHashMap<HttpSession, String>();

    @Override
    public void contextInitialized(ServletContextEvent event) {
        event.getServletContext().setAttribute(ATTRIBUTE_NAME, this);
    }

    @Override
    public void requestInitialized(ServletRequestEvent event) {
        HttpServletRequest request = (HttpServletRequest) event.getServletRequest();
        HttpSession session = request.getSession();
        if (session.isNew()) {
            sessions.put(session, request.getRemoteAddr());
        }
    }

    @Override
    public void sessionDestroyed(HttpSessionEvent event) {
        sessions.remove(event.getSession());
    }

    @Override
    public void sessionCreated(HttpSessionEvent event) {

    }

    @Override
    public void requestDestroyed(ServletRequestEvent event) {

    }

    @Override
    public void contextDestroyed(ServletContextEvent event) {

    }

    public static SessionCounter getInstance(ServletContext context) {
        return (SessionCounter) context.getAttribute(ATTRIBUTE_NAME);
    }

    public int getCount(String remoteAddr) {
        return Collections.frequency(sessions.values(), remoteAddr);
    }

    public Map<HttpSession, String> getList(){
        return sessions;
    }

}