function showPopup(popup){
    if(typeof activePopup!='undefined'){
        if(activePopup.id==popup.id)
            activePopup.toggle();
        else{
            activePopup.hide();
            popup.show();
        }
    }
    else
        popup.show();
    activePopup=popup;
    if(typeof activePopup!='undefined' && activePopup.visible()){
        updateRightSideButtons(activePopup.id);
        $('div#mapButtons').show();
    }
    else
        $('div#mapButtons').hide();
}