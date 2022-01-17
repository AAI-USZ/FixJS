function clickRoom(e){
        if (cntrl) return click(e);

        infoWindow.setContent('<a href="http://www.rcsa.co.uk/rooms#'+obj.id+'">'
            +obj.name+'</a>');

        infoWindow.setPosition(e.latLng);
        infoWindow.open(map.map);
      }