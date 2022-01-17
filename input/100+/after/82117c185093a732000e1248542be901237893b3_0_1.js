function(event) {
		var x = longToX(event.longitude), y = latToX(event.latitude),
		    dot, i, j, radius = 2, length, distance, delay, nx, ny,
		    targetRadius = dotRadius,
		    targetColor = new Color(event.color),
		    createChangers = function (x, y, startColor, targetColor, startRadius, delay, length) {
			setTimeout(function() {
			    eventQueue.push(pub.events.changeColor(x, y, startColor, targetColor, length, function () {
				eventQueue.push(pub.events.changeColor(x, y, targetColor, startColor, length, function () {}));
			    })); 
			    eventQueue.push(pub.events.changeRadius(x, y, startRadius, targetRadius, length, function () {
				eventQueue.push(pub.events.changeRadius(x, y, targetRadius, startRadius, length, function () {}));
			    }));
			}, delay);
		    };
		for(i = -radius; i <= radius; i += 1) {
		    for(j = -radius; j <= radius; j += 1) {
			nx = x + i;
			ny = y + j;
			distance = Math.sqrt(i*i + j*j);
			if(nx >= 0 && ny >= 0 && nx < width && ny < height && distance <= radius) {
			    dot = grid[nx][ny];
			    delay = Math.sqrt(distance) * event.length/radius;
			    length = distance === 0 ? event.length : event.length/radius;
			    if(length > 0) {
				createChangers(nx, ny, dot.initial.color, new Color(targetColor.rgbString()).lighten(0.32*distance).clearer(0.2*distance), dot.initial.radius, delay, length);
			    }
			}
		    }
		}
	    }