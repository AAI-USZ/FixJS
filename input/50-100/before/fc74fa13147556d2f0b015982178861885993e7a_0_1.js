function showPopup(popup){
    /*if(typeof activePopup!='undefined')
        if(activePopup==popup)
            popup.toggle;
        else
            activePopup.hide();*/
    if(typeof activePopup!='undefined')
        if(activePopup==popup)
            popup.toggle();
        else{
            activePopup.hide();
            popup.show();
    } else
        popup.show();
    activePopup=popup;
}