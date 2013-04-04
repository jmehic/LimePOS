$(document).ready(function(){
    var $wel = $('#welmsg');
    var $setup = $('.setup');
    var $inventory = $('.inventory');
    //var $inventory_item = $('.inventory-item');
    var $stats = $('.stats>*');
    var $report = $('.report>*');
    var $edit_inv = $('.edit-inventory');
    var $edit_item = $('.edit-item');
    var $elements = $('#welmsg, .setup, .inventory, .inventory-item, .stats>*, .report>*, .edit-inventory, .edit-item');
    //$inventory_item.accordion({ collapsible: true, active: false });
    $edit_item.accordion({ collapsible: true, active: false });
    $elements.hide();
    $wel.show();

    $('#setup').on('click', function(){
        $elements.fadeOut('slow');
        $setup.fadeIn('slow');
    });

    $('#inv').on('click', function(){
        $elements.fadeOut('slow');
        $inventory.fadeIn('slow');
        $('.inventory-item').fadeOut('slow');
        var inventory;
        var itemArray = [];
        $.get("/inventory", function(items){
            inventory = items;
            $.each(inventory, function( count, item ){
                $('.inventory-item').append('<h3>'+item.item_name+'</h3>\
                    <p>Price:'+item.item_price+'\
                    Quantity:'+item.item_quantity+'\
                    <button class="add-button btn btn-small btn-primary" type="button" id="'+item.item_id+'">Add to cart</button></p>');
            });
            $('.inventory-item').accordion({ collapsible: true, active: false });
            $('.inventory-item').fadeIn('slow');
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
        $edit_item.fadeIn('slow');
    });
});
