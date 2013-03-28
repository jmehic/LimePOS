$(document).ready(function(){
    var $wel = $('#welmsg');
    var $inventory = $('.inventory');
    var $inventory_item = $('.inventory-item');
    var $stats = $('.stats>*');
    var $report = $('.report>*');
    var $edit_inv = $('.edit-inventory');
    $edit_inv.hide();
    $report.hide();
    $stats.hide();
    $inventory.hide();
    $inventory_item.hide();
    $('#inv').on('click', function(){
        $wel.fadeOut('slow');
        $edit_inv.fadeOut('slow');
        $stats.fadeOut('slow');
        $report.fadeOut('slow');
        $inventory.fadeIn('slow');
        $inventory_item.fadeIn('slow');
    });

    $('#tds').on('click', function(){
        $wel.fadeOut('slow');
        $edit_inv.fadeOut('slow');
        $inventory.fadeOut('slow');
        $inventory_item.fadeOut('slow');
        $report.fadeOut('slow');
        $stats.fadeIn('slow');
    });

    $('#gen').on('click', function(){
        $wel.fadeOut('slow');
        $edit_inv.fadeOut('slow');
        $inventory.fadeOut('slow');
        $inventory_item.fadeOut('slow');
        $stats.fadeOut('slow');
        $report.fadeIn('slow');
    });

    $('#edit').on('click', function(){
        $wel.fadeOut('slow');
        $inventory.fadeOut('slow');
        $inventory_item.fadeOut('slow');
        $stats.fadeOut('slow');
        $report.fadeOut('slow');
        $edit_inv.fadeIn('slow');
    });
});
