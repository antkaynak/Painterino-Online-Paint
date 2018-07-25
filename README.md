# Painterino-Online-Paint
# Make sure to check out the new version ! [Painterino v2](https://github.com/antkaynak/Painterino-v2)


A simple multi-user web paint application made with JavaEE7.

![alt text](https://github.com/Exercon/Painterino-Online-Paint/blob/master/_screenshots/antweblogin.png)


![alt text](https://github.com/Exercon/Painterino-Online-Paint/blob/master/_screenshots/antwebmain.png)

![alt text](https://github.com/Exercon/Painterino-Online-Paint/blob/master/_screenshots/antwebpaint2.png)


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## About This Project

* You can draw to canvas and anybody in the room can see!
* You can only delete what you drew.
* You can change the size as well as the color of your pen!
* You can save the image to your local machine.
* This application fully sports scaling and is responsive!
* You can see who is online in the room.
* If you want you can go offline and draw by yourself!
* Your session is tracked so you dont have to login every time.
* Full support for mobile and tablets!

### Disclaimer
For this project I used AJAX system. You normally want to use Web Sockets or WebRTC API.
If you want to scale this project to bigger audience I highly recommend using a real-time communication API.


### Prerequisites

What things you need to install

```
You need Tomcat server 8 or above installed.
Locally installed MySQL or a MySQL server.
Compatible IDE, Intellij IDEA recommended for this project.
Web application 3.1 ( Configured web.xml is included )


```

### Installing



For MySQL Database 

```
You have to edit paintLogin.java Servlet to handle SQL communications if it is not compatible with your database.
Also you need to configure context data source and fill the necessary blanks.
If you want to use any database other than MySQL, you have to make necessary changes.
```

For Tomcat Application Server

```
Use Tomcat 8 or above. If you are running in online server like Amazon Elastic Beanstalk read the steps in paintLogin.java
and make changes to Data Source.
```

### Database 
This is a simple application so it has a simple database. SQL Script is below.

```
CREATE TABLE Users (
	UserID int NOT NULL AUTO_INCREMENT,
    Username varchar(40) UNIQUE NOT NULL,
    UserPassword varchar(40) NOT NULL,
    UserEmail varchar(40) NOT NULL,
    PRIMARY KEY(UserID),
    CONSTRAINT users_unique UNIQUE (Username)
);

```

Alternatively, with the correct naming conventions.

```
CREATE TABLE users (
	user_id int(11) NOT NULL AUTO_INCREMENT,
    username varchar(40) UNIQUE NOT NULL,
    password varchar(40) NOT NULL,
    email varchar(40) NOT NULL,
    PRIMARY KEY(user_id),
    CONSTRAINT users_unique UNIQUE (username)
);

```


## Built With

* [Maven](https://maven.apache.org/) - Dependency Management
* [JSColor](http://jscolor.com/) - Color selecting
* [GSON](https://github.com/google/gson) - JSON Object converting 
* [Connector/J](https://dev.mysql.com/downloads/connector/j/5.1.html) - Connecting to MySQL Database Server
* [Jquery](https://jquery.com/) - AJAX Requests 
* [Bootstrap](http://getbootstrap.com) - UI Components


## Known Bugs
* There is a bug on mobile or tablets that prevents you from picking a color, you have to spam the button.
* If the server gets overloaded with data It can crash. See Disclaimer for recommended comminication ways.

## Contributing

If you want to contribute to this project you can e-mail me - antkaynak1@gmail.com
or you can pull request.

## Versioning

This project does not have versioning and made with learning purposes.


## Authors 

* **Ant Kaynak** - *Initial work* - [Github](https://github.com/antkaynak)


## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/Exercon/Painterino-Online-Paint/blob/master/LICENSE) file for details.

JSColor has different license. [JSLicense](http://www.gnu.org/licenses/gpl-3.0.txt) - for details
visit their page [JSColor](http://jscolor.com/)

GSON has different license. [License](http://www.apache.org/licenses/LICENSE-2.0) - for details 
visit their page [GSON](https://github.com/google/gson)

Connector/J [License](https://downloads.mysql.com/docs/licenses/connector-j-5.1-gpl-en.pdf) - for details
visit their page [MySQL](https://dev.mysql.com/downloads/connector/j/5.1.html)

Bootstrap [License](https://v4-alpha.getbootstrap.com/about/license/)



## Acknowledgments

* A huge thanks to BalusC for his [post](https://stackoverflow.com/questions/3679465/find-number-of-active-sessions-created-from-a-given-client-ip/3679783#3679783)
* Another huge thanks to [GSON](https://github.com/google/gson)
* Readme template by [PurpleBooth](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)
* Login screen [Aigars Silkalns](https://codepen.io/colorlib/)

# Questions
If you have any questions mail me -  antkaynak1@gmail.com

