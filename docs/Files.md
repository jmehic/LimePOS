#Files

##Server-side:

###app.js:
The main server file for the whole web application. Everything is powered by the server. Originally generated by Express and modified to our needs. Initializes the server and database, includes necessary libraries, processes GET and POST requests, connects with the database to fulfill requests from webpages, and reports any errors encountered to the terminal. Written in Javascript.

###routes/index.js:
Routing file generated by Express for the index page. Written in Javascript.

###routes/user.js:
Routing file generated by Express for the user page. Written in Javascript.

##Client-side:
###views/about.ejs:
Basic about page, outlining information about the web application, written in HTML with CSS for style.

###views/account.ejs:
The main page of the web application. This page is where the user ends up when they log in. The main functionality of the service is implemented through this page. It works interactively using jQuery and jQuery UI in order to request data from the database (through the server) and update the interface accordingly. Written in HTML with CSS for style.

###views/create.ejs:
Simple page to create an account with the service. Uses a basic form to post the new users' data to the server. Written in HTML with CSS for style.

###views/index.ejs:
The main page that is rendered when a user is not logged in. Simple introduction to the web application with links in the top navigation bar to other pages. Written in HTML with CSS for style.

###views/login.ejs:
Simple log in page. Allows the user to log in to the service with their credentials. Uses a basic form to post the users' data to the server. Redirects to the Account page if log in was successful. Written in HTML with CSS for style.

###public/stylesheets/style.css:
The main stylesheet for the web application. Includes styling for classes such as .header, .body, and .footer. Includes fonts from Google's font API. Written in CSS.

###public/images/dark_fish_skin.png:
Image used for the background of all pages of the web application. Setup in the style.css file to repeat across the background. Image from a website dedicated to subtle backgrounds called [Subtle Patterns](http://subtlepatterns.com/).

###public/images/favicon.ico:
A favicon image for the site. A slice of a lime. Source: http://www.clker.com/clipart-lime-slice.html

###public/javascripts/account.js:
The main Javascript file for the web application. Powers the Account page, allowing for communication between the client and the server, and for user interaction with the service. Contains jQuery methods for capturing HTML elements and event handlers for reacting to button clicks. Also allows for GET and POST requests to the server from the Account interface, providing the fundamental functionality of the service. Written in Javascript with heavy use of jQuery and jQuery UI library functionality.