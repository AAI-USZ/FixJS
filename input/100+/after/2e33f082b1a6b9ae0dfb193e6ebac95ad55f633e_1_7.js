f
        building=new Building(data.building[0].buildingID,data.building[0].name); 
        var buildingList={};
        if(localStorage["favorites"]!=null){
            buildingList=JSON.parse(localStorage["favorites"]);
        }
        method=(buildingList[building.id]==null)? 'like':'unlike'; 
       // $.post("http://tali.irail.be/REST/Building.php?buildingID="+buildingID+"&method="+method+"&device="+device,function(data){

        $.post("http://localhost/REST/Building.php?buildingID="+buildingID+"&method="+method+"&device="+device,function(data){
            //alert(data);
        }); 
        
        if(method=='like'){
            buildingList[building.id]=building;        
            localStorage["favorites"]=JSON.stringify(buildingList);       
        }else{
            buildingList[building.id]=undefined;            
            localStorage["favorites"]=JSON.stringify(buildingList);    
        }
        
        if(buildingList[building.id]!=null)
            $("img#mustSeeButton").attr("src","img/favorites-selected.png")
        else
            $("img#mustSeeButton").attr("src","img/favorites.png"); 

        fillCategory('favorites');
        updateIcon(data.building[0].buildingID,data.building[0].catName);
    })     
