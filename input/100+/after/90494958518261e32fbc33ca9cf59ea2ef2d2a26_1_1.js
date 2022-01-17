f
  var myOptions = {
          center: new google.maps.LatLng(-34.88, -56.20),
          zoom: 13,
          mapTypeId: google.maps.MapTypeId.ROADMAP
  };
        
  var map = new google.maps.Map(document.getElementById("map_canvas"),
                myOptions);

  var polyCoords = [];

  for(var i=0;i<losBarrios.length;i++){
    var obj = losBarrios[i];
    var colorActual = obj.color;      
    var barrioCoords = [];

    for(var j = 0; j<obj.coordinates.length; j++){

      var coordinate = obj.coordinates[j];

      if(coordinate.xcoordinate != null && coordinate.ycoordinate != null){

        var ll = new google.maps.LatLng(coordinate.xcoordinate, coordinate.ycoordinate);
        barrioCoords.push(ll);
      }
    }

    if(barrioCoords != null){

          console.log(barrioCoords);

          var thePoly = new google.maps.Polygon({

            clickable: true,
            paths: barrioCoords,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: colorActual,
            fillOpacity: 0.35
          });

          thePoly.setMap(map);
    }
    

        /*
        var pocitos = [

          new google.maps.LatLng(-34.874252, -56.130262),
          new google.maps.LatLng(-34.874252, -56.118292),
        * new google.maps.LatLng(-34.890001, -56.118292),
         * new google.maps.LatLng(-34.890001, -56.130262)
        ]
          
        polyCoords.push(pocitos);          

        var puntaCarretas = [

          new google.maps.LatLng(-34.859001, -56.130262),
          new google.maps.LatLng(-34.859001, -56.118292),
          new google.maps.LatLng(-34.874251, -56.118292),
          new google.maps.LatLng(-34.874251, -56.130262)
        ]

        polyCoords.push(puntaCarretas);

        for(var j = 0; j<polyCoords.length; j++){

          var thisPoly = polyCoords[j];

          var myPoly = new google.maps.Polygon({
          clickable: true,
          paths: thisPoly,
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.35
          });

          myPoly.setMap(map);

          google.maps.event.addListener(myPoly, 'click', function(){

            this.setOptions({ fillColor: '#000000'});
          });
          */
        }
      }