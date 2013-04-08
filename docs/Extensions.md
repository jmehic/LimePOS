#Extensions

###Automatic pairing for combos

If multiple items are added to the cart that have a deal/combo attached to them, automatically apply the deal/combo to the
price. To implement this, we would add a deal/combo field and a reduction amount field to our Item model in mongoose that would keep track of what deal is currently active on the item and the corresponding price reduction. When processing the cart, there would be a check to see if any items have deals and the price would be reduced accordingly. Two input boxes would be added to the Set Up Inventory view so that users could customize combos/deals. Our existing design supports this extension because the Item model can be easily modified to store extra fields. The UI upgrades would only consist of updating the Set Up view to include the two extra input boxes, one for deal/combo status, and one for reduction amount.

###Graphs showing long term stats

In the Generate Reports view, a graph would be displayed showing long term trends based on currently existing data. To implement this, we would take advantage of the [Chart.js](http://chartjs.org) library. By adding stats tracking to the database, we would generate the graph based on recorded data. Our existing design supports this extension because the database can easily be updated to store statistics.

###Tutorial on the account homepage

A tutorial on the main account page that shows how to use the service. To implement this, we would use the [Intro.js](http://usablica.github.io/intro.js/) library. With this library, adding a graphical tutorial as straightforward as including the required Javascript and CSS files and updating the UI code to include the necessary classes. Our existing design supports this extension because it is simply a client-side interface update.

###Display warning when certain items run low

On the Inventory view, when an item goes below a specified threshold, the "Add to cart" button will turn red. To implement this extension, we would add a field to the Item model that stores the threshold count. In the interface, we would check this threshold against the current item count and update the interface accordingly. Our existing design supports this extension because the Item model can be modified to track the threshold and the interface can easily be updated to reflect a low item count.

###Ability to use scanable barcodes

On the Inventory view, along with being able to add items to the cart using the "Add to cart" button, our service would support adding items by using a barcode scanner. Each item in the database would have a barcode number and when the user scanned the physical barcode, it would find the correct item in the database and add the price to the cart. To implement this extension, we would have to add a barcode field to the Item model and also develop a way to accept input from the barcode scanner. Our existing design partially supports this, as updating the Item model is simple, but scanning in and processing barcodes from a barcode scanner is more difficult.