function(data){
                updateIcon(building.id,data.building[0].category)
                mapDirect = building.id;
                window.location.href = '#map'; 
            }