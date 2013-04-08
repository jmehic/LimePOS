#Motivation
By: Brandon Hurley

The Lime/Coconut Point of Sales (POS) project came about as what I felt was a solution for a long standing problem. During my one year stint with the Carleton Computer Science Society as a volunteer, one of my jobs was handling transactions for any food purchases made in our office. To track everything, we used an open source POS system called Lemon. While it did the job it was supposed to, I noticed some issues with it:

1. The user interface was a mess. It provided too many options all at once and is fairly confusing how to do things 
without someone else showing it for you. This resulted in longer transactions.

2. The service had some serious bugs affecting usage.  It would break on a 2-3 week basis, which required our only 
volunteer who knew how to work the entire system thoroughly to fix it. It also had a bug on which after 24 hours from 
the startup of the service, the client would disconnect from the database breaking it entirely. 
The only solution was to restart the service daily. Considering the service is intended to run non-stop, this was 
very frustrating for us.

3. The service had no online backup solution. While it was not as big of an issue since we used it with just one 
computer, there was no easy way to have backups of the database for later. If the computer went out, so did 
anything we were tracking in the database. It was not very portable.

4. The service could not be modified easily. Relating to the UI issue I mentioned earlier, Lemon provided features 
and options the CCSS would never use.  They got in the way more than anything. However, despite the fact that Lemon 
is open source, it was considered too much effort to modify Lemon's code to suit their needs.

Something better needed to be made available. Lemon was good but fairly sloppy. Lime and Coconut would be the answer.

When drafting up what we wanted to accomplish, we focused on 3 key goals:

###Provide an alternative POS system that gives all the benefits of a web application

The new service is to be entirely web based. With this, it delegates all the heavy lifting and data storage to the server, leaving the local computer to just be a dumb terminal. If the terminal were to break, all the data is still safe and service can be resumed at any computer with a browser and internet access. It also allows fast deployment with little to no setup time for new users.

###Have a stable service that can be easily modified as the need arises

The new service is to be robust and modular in design. It should be able to run as long as the server is running for and adapt to changing user demands. A feature can be added or removed easily with no issues. Provide only what is needed by the end user.

###A sleek UI and a softened learning curve for usage

The new service is to be easy to use and clear on where things are. A fresh user interface showing only what is needed along with clear documentation on usage to allow the users to need no prior understanding on how to make it work.
