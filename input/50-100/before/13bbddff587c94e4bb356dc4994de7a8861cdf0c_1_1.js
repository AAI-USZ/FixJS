function (){
			var dataPoints = $.toJSON(drawingPoints);
			
			var doodleToSave = new Doodle(dataPoints);
			doodleToSave.send();
		}