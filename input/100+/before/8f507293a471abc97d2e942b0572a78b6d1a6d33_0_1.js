function(event) {
			
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
	
		}