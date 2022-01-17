function getIcon(buildingID,category){
   var icon;
   if(localStorage["favorites"]!=null){
        $.each(JSON.parse(localStorage["favorites"]), function(key, building) {            
            if(building!=null && building.id==buildingID)
               icon = 'img/markers/'+category.toLowerCase()+'[fav].png';     
        });
    }
    if(JSON.parse(localStorage["seen"]!=null)){
        if(icon==null){
            $.each(JSON.parse(localStorage["seen"]), function(key, building) {
                if(building.id==buildingID)
                    icon = 'img/markers/'+category.toLowerCase()+'[seen].png';     
            });        
        }
    }
    if(icon==null){
        icon = 'img/markers/'+category.toLowerCase()+'.png';    
    }     
    return icon;
}