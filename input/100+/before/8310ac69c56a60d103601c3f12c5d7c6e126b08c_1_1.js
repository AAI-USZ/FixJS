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
        var buildingList;
       // if(localStorage["mustSee"]!=null){
            buildingList=JSON.parse(localStorage["favorites"]);
            if(buildingList[activePopup.id]!=null)
                $("img#mustSeeButton").attr("src","img/favorites-selected.png");
            else
                $("img#mustSeeButton").attr("src","img/favorites.png");  
        //}else $("img#mustSeeButton").attr("src","img/favorites.png");  ;
       
        $('div#mapButtons').show();
    }
    else
        $('div#mapButtons').hide();
}