function(){
			var center=map.getCenter();
			console.log("Center is currently: " + center.lat() + " " + center.lng());
			if(center.lat()>=earthquakeList[selectedEarthquake][LATITUDE]-CHECK_CENTER_RANGE && center.lat()<=earthquakeList[selectedEarthquake][LATITUDE]+CHECK_CENTER_RANGE){
				if(center.lng()>=earthquakeList[selectedEarthquake][LONGITUDE]-CHECK_CENTER_RANGE && center.lng()<=earthquakeList[selectedEarthquake][LONGITUDE]+CHECK_CENTER_RANGE){
					tutorial.eventFinished();
					window.clearInterval(interval);
				}
			}
		
		}