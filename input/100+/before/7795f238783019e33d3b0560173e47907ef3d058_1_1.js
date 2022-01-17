function (points, startPoint) {
			console.log(startPoint);

			var locX,
				locY,
				radius,
				i,
				selected;

			// Make sure required resources are loaded before redrawing
			if (curLoadResNum < totalLoadResources) {
				return;
			}

			//clearCanvas();

			// Keep the drawing in the drawing area
			context.save();
			context.beginPath();
			context.rect(drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
			context.clip();
			
			// For each point drawn
			var i;
			for (i = startPoint; i < points.length; i += 1) {

				// Set the drawing radius
				switch (points[i].size) {
				case "small":
					radius = 2;
					break;
				case "normal":
					radius = 5;
					break;
				case "large":
					radius = 10;
					break;
				case "huge":
					radius = 20;
					break;
				default:
					break;
				}
				

				// If dragging then draw a line between the two points
				if (points[i].drag && i) {
					context.moveTo(points[i - 1].x, points[i - 1].y);
				} else {
					// The x position is moved over one pixel so a circle even if not dragging
					context.moveTo(points[i].x - 1, points[i].y);
				}
				context.lineTo(points[i].x, points[i].y);
				
				// Set the drawing color
				if (points[i].tool === "eraser") {
					//context.globalCompositeOperation = "destination-out"; // To erase instead of draw over with white
					context.strokeStyle = 'white';
				} else {
					//context.globalCompositeOperation = "source-over";	// To erase instead of draw over with white
					context.strokeStyle = points[i].color;
					console.log(points[i].color);
				}
				context.lineCap = "round";
				context.lineJoin = "round";
				context.lineWidth = radius;
				context.stroke();
			}
			drawUpTo = i;
			context.closePath();
			//context.globalCompositeOperation = "source-over";// To erase instead of draw over with white
			context.restore();
		}