function (){
			if(drawingPoints.length == 0){
				$("#sendjson").html("DRAW FIRST");
			}
			else{
				var dataPoints = $.toJSON(drawingPoints);
				
				var doodleToSave = new Doodle(dataPoints);
				doodleToSave.send();
			}

		}