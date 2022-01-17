function (existingDoodle, doodlesToBeShownArray) {
			//add background image
			context.drawImage(backgroundImage, drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
			
			//add existing doodles
			if(existingDoodle.length > 0){
				for(var i=0;i<existingDoodle.length; i++){
					if(doodlesToBeShownArray == undefined)
						drawPoints(eval(existingDoodle[i].data), 0);
					else{
						if($.inArray(i.toString(), doodlesToBeShownArray) != -1)
							drawPoints(eval(existingDoodle[i].data), 0);
					}
				}
			}
			drawPoints(drawingPoints,0);
		}