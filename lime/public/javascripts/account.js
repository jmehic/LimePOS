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
        var inventory;
        var itemArray = [];
        //$inventory_item.append(inventory);
        $.get("/inventory", function(items){
            inventory = items;
            for(var i = 0; i < inventory.length; i++){
                var name = inventory[i].item_name;
                var $newItem = '<div class="inventory-item><h3>'+name+'</h3><p>ID: Price: Quantity:</p>';
                itemArray.push($newItem);
            };
        });
        $inventory.append(itemArray[0].item_name);
        for(var i = 0; i < itemArray.length; i++){
            $inventory.append(itemArray[i].item_name);
        }
            //$elements.fadeOut('slow');
            //alert(inventory);
            //$inventory_item.append(inventory[0].item_name);
            /*for(var i = 0; i < inventory.length; i++){
                var name_i = inventory[i].item_name;
                $inventory.append('<div id="' + i + '" class="inventory-item">');
                $('#'+i+'').html('<h3>name_'+i+'</h3>
                    <p>
                        ID:
                        Price:
                        Quantity:
                    </p>
                    </div>');
            };
            for(var i = 0; i < inventory.length; i++)
                $inventory.append(inventory[i].item_name);
        });
        /*for(var j = 0; j < inventory.length; j++){
            $('body').append(div_j);
        };*/
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
