function addCurrentItem(){
    // add in the options
    var options = document.getElementById("options").getElementsByClassName("option");
    for (var i = 0; i < options.length; i++){
      if (options[i].getElementsByClassName("optionCheck")[0].checked){
        currentItem.options.push($(options[i]).attr("data-moid"));
        if (currentItem.price.length > 4){
          currentItem.price = String(currentItem.price).substring(0, 3);
        }
        currentItem.price += Number($(options[i]).children("span.price").html());
      }
    }

    order.price  += Number(currentItem.price);
    order.string += " 1 " + currentItem.name;
    
    // put in order object
    order.items.push(currentItem);

    // show in ui
    var itemName = $("#optionsTitle").html();
    $("#trayList").append("<li data-index=" + (order.items.length - 1) + "><p class=\"itemName\">" + itemName + " </p>" + 
                          "<span class=\"price\">" + currentItem.price + "</span></li>");
    $("#trayList").append("<div class='clear'></div>");

    //unhide tray
    $("#tray").removeClass("hidden");
    // hide dialog
    $("#optionsDialog").modal("hide");
  }