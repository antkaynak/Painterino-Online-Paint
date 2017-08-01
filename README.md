# Painterino-Online-Paint


A simple multi-user web paint application made with JavaEE7.

![alt text](https://github.com/Exercon/Painterino-Online-Paint/blob/master/_screenshots/antweblogin.png)


![alt text](https://github.com/Exercon/Painterino-Online-Paint/blob/master/_screenshots/antwebmain.png)


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

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

This project is made with JavaEE7. JSP-Servlet MVC model is used.
This is a beginner project and made for learning purposes.
You are free to copy or use codes in my project as long as you are making a referance to me.


## Built With

* [Maven](https://maven.apache.org/) - Dependency Management
* [JSColor](http://jscolor.com/) - Color selecting
* [GSON](https://github.com/google/gson) - JSON Object converting 
* [Connector/J](https://dev.mysql.com/downloads/connector/j/5.1.html) - Connecting to MySQL Database Server
* [Jquery](https://jquery.com/) - AJAX Requests 


## Contributing

If you want to contribute to this project you can e-mail me - antkaynak1@gmail.com
or you can pull request.

## Versioning

This project does not have versioning and made with learning purposes.


## Authors 

* **Ant Kaynak** - *Initial work* - [Exercon](https://github.com/Exercon)


## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/Exercon/Painterino-Online-Paint/blob/master/LICENSE) file for details.

JSColor has different license. [JSLicense](http://www.gnu.org/licenses/gpl-3.0.txt) - for details
visit their page [JSColor](http://jscolor.com/)

GSON has different license. [License](http://www.apache.org/licenses/LICENSE-2.0) - for details 
visit their page [GSON](https://github.com/google/gson)

Connector/J [License](https://downloads.mysql.com/docs/licenses/connector-j-5.1-gpl-en.pdf) - for details
visit their page [MySQL](https://dev.mysql.com/downloads/connector/j/5.1.html)


## Acknowledgments

* A huge thanks to BalusC for his [post](https://stackoverflow.com/questions/3679465/find-number-of-active-sessions-created-from-a-given-client-ip/3679783#3679783)
* Another huge thanks to [GSON](https://github.com/google/gson)
* Readme template by [PurpleBooth](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)
* Login screen [Aigars Silkalns](https://codepen.io/colorlib/)

# Questions
If you have any questions mail me -  antkaynak1@gmail.com

