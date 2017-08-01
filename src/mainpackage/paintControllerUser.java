package mainpackage;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/*
    Made by Ant Kaynak - github.com/Exercon

 */

public class paintControllerUser{

    private List<String> list;
    private String Username;

    paintControllerUser(String Username){
        list = new ArrayList<String>();
        this.Username = Username;
    }

    public void storeData(String[] myJsonData){
        list.addAll(Arrays.asList(myJsonData));
    }

    public void cleanData(){
        list.clear();
    }

    public List<String> getList() {
        return list;
    }

    public void setList(List<String> list) {
        this.list = list;
    }

    public String getUsername() {
        return Username;
    }

    public void setUsername(String sessionID) {
        this.Username = sessionID;
    }
}
