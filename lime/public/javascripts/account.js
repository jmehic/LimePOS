$(document).ready(function(){
    var $wel = $('#welmsg');
    var $setup = $('.setup');
    var $inventory = $('.inventory');
    var $edit_inv = $('.edit-inventory');
    var $stats = $('.stats>*');
    var $report = $('.report>*');
    var $elements = $('#welmsg, .setup, .inventory, .inventory-item, .stats>*, .report>*, .edit-inventory, .edit-item');
    $elements.hide();
    $wel.show();

    $('#setup').on('click', function(){
        $elements.fadeOut('slow');
        $setup.fadeIn('slow');
    });

    $('#inv').on('click', function(){
        $elements.fadeOut('slow');
        $inventory.fadeIn('slow');
        var inventory;
        var itemArray = [];
        var cartAmount = 0;
        var cartIds = [];
        $.get("/inventory", function(items){
            inventory = items;
            $.each(inventory, function( count, item ){
                $('.inventory-item').append('<h3>'+item.item_name+'</h3>\
                    <p style="font-size: 20px;">Price:'+item.item_price+'\
                    Quantity:'+item.item_quantity+'\
                    <button class="add-button btn btn-small btn-primary"\
                    type="button" id="addbtn'+count+'">Add to cart</button></p>');

                $('#addbtn'+count).on('click', function(){
                    cartAmount += inventory[count].item_price;
                    cartIds.push(inventory[count].item_id);
                    $('#cart').val("$"+cartAmount);
                });
            });
            $('.inventory-item').accordion({ collapsible: true, active: false, autoHeight: true });
            $('.inventory-item').fadeIn('slow');
        });

        $('#chckbtn').on('click', function(){
            $.ajax({
                type: 'POST',
                url: '/checkout',
                data: { itemsSold: cartIds }
            });
        });
    });

    $('#edit').on('click', function(){
        $elements.fadeOut('slow');
        $edit_inv.fadeIn('slow');
        var inventory;
        var itemArray = [];
        $.get("/inventory", function(items){
            inventory = items;
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
                $('#savebtn'+item.item_id).on('click', function(){
                    var newPrice = $('#price'+count).val();
                    var newQuantity = $('#quantity'+count).val();
                    $.ajax({
                        type: 'POST',
                        url: '/savechanges',
                        data: { itemId: item.item_id, price: newPrice, quantity: newQuantity }
                    });
                });
            });
            $('.edit-item').accordion({ collapsible: true, active: false });
            $('.edit-item').fadeIn('slow');
        });
    });

    $('#tds').on('click', function(){
        $elements.fadeOut('slow');
        $stats.fadeIn('slow');
    });

    $('#gen').on('click', function(){
        $elements.fadeOut('slow');
        $report.fadeIn('slow');
    });
});
