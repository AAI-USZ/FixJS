function initialize() {

        var mapOptions = {
          center: new google.maps.LatLng(51.500152,-0.126236),
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

         map = new google.maps.Map(document.getElementById('map-canvas'),
          mapOptions);

        var drawingManager = new google.maps.drawing.DrawingManager({
          drawingMode: google.maps.drawing.OverlayType.POLYGON,
          drawingControl: true,
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [
              google.maps.drawing.OverlayType.MARKER,
              google.maps.drawing.OverlayType.CIRCLE,
              google.maps.drawing.OverlayType.POLYGON
            ]
          },
          markerOptions: {
            icon: 'images/beachflag.png'
          },
          polygonOptions: {
            fillColor: '#ff0000',
            fillOpacity: 0.5,
            strokeColor: '#ff0000',
            strokeWeight: 2,
            clickable: false,
            editable: true,
            zIndex: 1
          }
        });

        drawingManager.setMap(map);

		google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
			
			//This doesn't do anything at present.
			if (event.type == google.maps.drawing.OverlayType.CIRCLE) {
				var radius = event.overlay.getRadius();
			}

			if (event.type == google.maps.drawing.OverlayType.POLYGON) {

				var path = event.overlay.getPath();
				
				savePolygon(path);
				
				addListenersToPolygon(path);	
		
				showArticles(path,function(err,data){
					if(err == null){
						//console.log(data.articles.length + " articles found",data);

					}else{
						console.log("Error:" + err.toString());
					}
				});


			}
	
		});

		var path = retrievePolygon();



		var location = new google.maps.Polygon({
			path:path,
			fillColor: '#ff0000',
			fillOpacity: 0.5,
			strokeColor: '#ff0000',
			strokeWeight: 2,
			clickable: false,
			editable: true,
			zIndex: 1
		});

		location.getPath().getAt(0);

		addListenersToPolygon(location.getPath());
	
		showArticles(path,function(err,data){
			if(err == null){
				//console.log(data.articles.length + " articles found",data);

			}else{
				console.log("Error:" + err.toString());
			}
		});

		location.setMap(map);

      }