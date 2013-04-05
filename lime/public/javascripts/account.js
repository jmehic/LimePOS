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
        $.get("/inventory", function(items){
            inventory = items;
            $.each(inventory, function( count, item ){
                $('.inventory-item').append('<h3>'+item.item_name+'</h3>\
                    <p style="font-size: 20px;">Price:'+item.item_price+'\
                    Quantity:'+item.item_quantity+'\
                    <button class="add-button btn btn-small btn-primary" type="button" id="'+item.item_id+'">Add to cart</button></p>');
            });
            $('.inventory-item').accordion({ collapsible: true, active: false, autoHeight: true });
            $('.inventory-item').fadeIn('slow');
            $('#0').on('click', function(){
                alert("add button");
                if($(this).attr('id') === 'item0'){
                    $('#cart').val(inventory[0].item_price);
                };
            });
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

    $('#edit').on('click', function(){
        $elements.fadeOut('slow');
        $edit_inv.fadeIn('slow');
        var inventory;
        var itemArray = [];
        $.get("/inventory", function(items){
            inventory = items;
            $.each(inventory, function( count, item ){
                $('.edit-item').append('<h3>'+item.item_name+'</h3>\
                    <label for="price">Price:</label>\
                    <input id="price" type="text" name="price"></input>\
                    <label for="quantity">Quantity:</label>\
                    <input id="quantity" type="text" name="quantity"></input>\
                    <button class="save-button btn btn-small btn-primary" type="button" id="'+item.item_id+'">Save changes</button>');
            });
            $('.edit-item').accordion({ collapsible: true, active: false, autoHeight: false });
            $('.edit-item').fadeIn('slow');
        });
    });
});
