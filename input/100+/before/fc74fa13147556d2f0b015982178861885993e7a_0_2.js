function(data) {
        var h1 = $('<h1 />').html(data.Building[0].name);
        
        var myDiv = $('<div />').append(h1);
        
        caller.data.popupContentHTML = $(myDiv).html();
        
        if (caller.popup == null) {
            caller.popup = caller.createPopup(this.closeBox);
            map.addPopup(caller.popup);
            //caller.popup.show();
            //showPopup(caller.popup);
        } else {
            //caller.popup.toggle();
        }
        showPopup(caller.popup);
        currentPopup = caller.popup;
    }