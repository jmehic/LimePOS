//var globals = {};

$(document).ready(function(){
    var $wel = $('#welmsg');
    var $setup = $('.setup');
    var $inventory = $('.inventory');
    var $inventory_item = $('.inventory-item');
    var $stats = $('.stats>*');
    var $report = $('.report>*');
    var $edit_inv = $('.edit-inventory');
    var $edit_item = $('.edit-item');
    var $elements = $('#welmsg, .setup, .inventory, .inventory-item, .stats>*, .report>*, .edit-inventory, .edit-item');
    //globals.inventory;
    $inventory_item.accordion({ collapsible: true, active: false });
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
        $inventory_item.fadeIn('slow');
        $inventory_item.append(inventory);
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

//$(function sendInventory(items){
  // inventory = items;
//});

//exports.sendInventory = sendInventory;
