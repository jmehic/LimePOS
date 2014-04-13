#Lime Point of Sales

##Introduction
A point of sale is the place where a transaction takes place during the exchange of goods and services.  In the past this was generally the physical checkout counter of a store, but as the world transitions to an internet-based economy the point of sale has shifted from a physical, hardware location to an online location.  In order to facilitate these transactions, Null Pointer Productions will provide an online, cloud-based point of sale service to online and bricks and mortar merchants.  Our service will allow merchants to keep track of their inventory, process transactions and have access to their critical information from anywhere that has an internet connection.

Our service will be superior to localized solutions such as Lemon POS because everything will be hosted and stored online, protecting vital information from local system crashes.  It will also provide a cleaner interface and more efficient backend using powerful web technologies.  Lime will use modern web technologies such as NodeJS to run the server and MongoDB to keep track of databases with a frontend client built using JavaScript and jQuery.

##Main Package Dependencies
* [NodeJS](http://nodejs.org)
* [ExpressJS](http://expressjs.com)
* [MongoDB](http://mongodb.org)
* [Bootstrap](http://twitter.github.io/bootstrap/)
* [jQuery](http://jquery.com)
* [jQuery UI](http://jqueryui.com)

##Project Organization
The docs folder contains documentation files for the project, including information on project architecture, files, dependencies, extensions, and project motivation. The lime folder contains the source code of the project, including both server and client side code.

##Installation
To get the project, clone the repository to your local machine. To run the project, run "node app.js" from the lime/ directory. In case there are any missing dependencies, run "npm install -d" from the lime/ directory which should install the required dependencies listed in the package.json file.

##Usage Information
To connect to the service, go to localhost:3000 in any browser (UI and functionality testing was done on Firefox and Chrome; some aspects of the UI break on Chrome so for the best experiece, please use Firefox).
To use the service, first create an account and then log in with your credentials. There is a link to help documentation included on the main account page of logged in users explaining different aspects of the service. Logging in for the first time may produce a noticeable delay as the server creates the database.

##Milestones

1. Architecture diagram and external libraries/programs (delivery: Feb 8)
  * high-level architecture diagram showing client and server layout
  * use of modern web technologies including NodeJS, MongoDB, JavaScript, jQuery, and HTML/CSS
2. Framework demo (delivery: Feb 15)
  * basic foundation of client site
  * basic foundational Node server processing requests
3. Working database with connection to server (delivery: Feb 22)
  * MongoDB set up to track users, inventory and transactions
4. Frontend client interface to access server (delivery: March 1)
  * clean, easy to use interface so clients can use the service
5. Client/server communication (delivery: March 8)
  * robust communication between client and server
  * minimal service interruptions
6. Working prototype/demo (delivery: March 15)
  * core feature set implemented and working
7. Special features (delivery: March 22)
  * functionality to automatically handle product combinations/sales/special offers
  * ability for accounts to modify their databases
  * security stressed throughout
8. Draft documentation (delivery: March 29)
  * technical and user documentation for both the client and server
  * help documentation to show how the service is used
9. Final code and documentation (delivery: April 5)
  * finalize code and documentation for submission
