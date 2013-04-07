//capture the document in jQuery when its ready
$(document).ready(function(){
    //grab the required html elements and put them in variables
    var $wel = $('#welmsg');
    var $setup = $('.setup');
    var $inventory = $('.inventory');
    var $edit_inv = $('.edit-inventory');
    var $stats = $('.stats>*');
    var $report = $('.report>*');
    var $elements = $('#welmsg, .setup, .inventory, .inventory-item, .stats>*, .report>*, .edit-inventory, .edit-item');
    //stats tracking variables
    var soldCount = 0;
    var revenue = 0;
    var changeGiven = 0;
    //initially hide all the elements except for the welcome message
    $elements.hide();
    $wel.show();

    //activate the setup view
    $('#setup').on('click', function(){
        $elements.fadeOut('slow');
        $setup.fadeIn('slow');
    });

    //activate the inventory view and retrieve the inventory from the database
    $('#inv').on('click', function(){
        $elements.fadeOut('slow');
        $inventory.fadeIn('slow');
        var inventory;
        var cartAmount = 0;
        var cash = 0;
        var changeDue = 0;
        var cartIds = [];
        //use jQuery AJAX to get the inventory
        $.get("/inventory", function(items){
            inventory = items;
            //for each item in the returned array, create a code block
            //with a header containing the name, labels containing the price
            //and quantity, and an add to cart button
            //append each of these to the main inventory div
            $.each(inventory, function( count, item ){
                $('.inventory-item').append('<h3>'+item.item_name+'</h3>\
                    <p style="font-size: 20px;">Price:'+item.item_price+'\
                    Quantity:'+item.item_quantity+'\
                    <button class="add-button btn btn-small btn-primary"\
                    type="button" id="addbtn'+count+'">Add to cart</button></p>');

                //event handler for each add button, connected by the item count
                $('#addbtn'+count).on('click', function(){
                    cartAmount += inventory[count].item_price;
                    cartIds.push(inventory[count].item_id);
                    $('#cart').val("$"+cartAmount); //update the dollar value in the cart input box
                });
            });
            //place an accordion on each item and fade them all in
            $('.inventory-item').accordion({ collapsible: true, active: false, autoHeight: true });
            $('.inventory-item').fadeIn('slow');
        });

        //event handler for the clear cart button
        $('#clearbtn').on('click', function(){
            if(cartIds.length === 0){
                alert("The cart is empty!");
            }
            else{
                cartIds.length = 0;
                cartAmount = 0;
                $('#cart').val("$"+0.00);
            }
        });

        //event handler for the check out button
        $('#chckbtn').on('click', function(){
            if(cartIds.length === 0){
                alert("The cart is empty!");
            }
            else if($('#amntgiven').val() === 0 || $('#amntgiven').val() < cartAmount){
                alert("Not enough cash to complete transaction!");
            }
            //if cart is not empty, posts the item IDs of all items sold to the database
            //the cartIds array stores duplicates, so we keep track of the count of each item
            else{
                cash = $('#amntgiven').val();
                changeDue = cash - cartAmount;
                //update stats
                soldCount += cartIds.length;
                revenue += cash;
                changeGiven += changeDue;
                alert("Transaction succeeded; change due: $"+changeDue);
                $('#cart').val("$"+0.00);
                $('#amntgiven').val("$"+0.00);
                $.ajax({
                    type: 'POST',
                    url: '/checkout',
                    data: { itemsSold: cartIds, itemCount: soldCount, itRevenue: revenue, chngGiven: changeGiven }
                });
            }
        });
    });

    //activate the edit inventory view and retrieve the inventory from the database
    $('#edit').on('click', function(){
        $elements.fadeOut('slow');
        $edit_inv.fadeIn('slow');
        var inventory;
        $.get("/inventory", function(items){
            inventory = items;
            //same idea as inventory view, except it has input boxes filled with the values
            //user can edit the value in the input box then save the update
            $.each(inventory, function( count, item ){
                $('.edit-item').append('<h3>'+item.item_name+'</h3>\
                    <div><p><label for="price">Price:</label>\
                    <input id="price'+count+'" type="text" name="price"></input>\
                    <label for="quantity">Quantity:</label>\
                    <input id="quantity'+count+'" type="text" name="quantity"></input>\
                    <button class="save-button btn btn-small btn-primary"\
                    type="button" id="savebtn'+item.item_id+'">Save changes</button></p></div>');
                $('#price'+count).val(item.item_price);
                $('#quantity'+count).val(item.item_quantity);
                //event handler for each item's save button
                $('#savebtn'+item.item_id).on('click', function(){
                    //gets the new values
                    var newPrice = $('#price'+count).val();
                    var newQuantity = $('#quantity'+count).val();
                    //posts the new values to the database
                    $.ajax({
                        type: 'POST',
                        url: '/savechanges',
                        data: { itemId: item.item_id, price: newPrice, quantity: newQuantity }
                    });
                });
            });
            //place an accordion on each item and fade them all in
            $('.edit-item').accordion({ collapsible: true, active: false });
            $('.edit-item').fadeIn('slow');
        });
    });

    //activate the daily stats view
    $('#tds').on('click', function(){
        $elements.fadeOut('slow');
        $stats.fadeIn('slow');
        var statsObj;
        //get the Stats object from the server and append to view
        $.getJSON("/stats", function(data){
            statsObj = data;
            $('#soldItems').append(statsObj.itemCount);
            $('#itemRevenue').append(statsObj.revenueEarned);
            $('#changeTracker').append(statsObj.changeG);
            $('#profitTracker').append(statsObj.profitMade);
        });
    });

    //activate the generate report view
    $('#gen').on('click', function(){
        $elements.fadeOut('slow');
        $report.fadeIn('slow');
    });
});
