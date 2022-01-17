function checkBuildingInArray(array, buildingID){
    var result=false;
     $.each(array, function(key, building) {
        if(building!=null)       
            if(building.id==buildingID)
               result=true;        
    });
    return result;    
}