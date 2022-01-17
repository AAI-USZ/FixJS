function getDistance(source, target) {
		// get coordinates
		var coords = calculateCoordinates(source, target);
		
		// calculate euclidean distances
		var distanceTopLeft = euclideanDistance(coords.diffLeft, coords.bottomSource - coords.topTarget);
		var distanceTop = euclideanDistance(coords.diffCenterX, coords.bottomSource - coords.topTarget);
		var distanceTopRight = euclideanDistance(coords.diffRight, coords.bottomSource - coords.topTarget);
//		var distanceLeft = euclideanDistance(coords.rightSource - coords.leftTarget, coords.diffCenterY);
		var distanceLeft = euclideanDistance(coords.diffLeft, coords.diffCenterY);
		var distanceCenter = euclideanDistance(coords.diffCenterX, coords.diffCenterY);
//		var distanceRight = euclideanDistance(coords.leftSource - coords.rightTarget, coords.diffCenterY);
		var distanceRight = euclideanDistance(coords.diffRight, coords.diffCenterY);
		var distanceBottomLeft = euclideanDistance(coords.diffLeft, coords.topSource - coords.bottomTarget);
		var distanceBottom = euclideanDistance(coords.diffCenterX, coords.topSource - coords.bottomTarget);
		var distanceBottomRight = euclideanDistance(coords.diffRight, coords.topSource - coords.bottomTarget);
		
//		alert(coords.toSource());
//		alert(options.toSource());
		
		if(options.distanceType == distanceType.TOPLEFT) return distanceTopLeft;
		else if(options.distanceType == distanceType.TOP) return distanceTop;
		else if(options.distanceType == distanceType.TOPRIGHT) return distanceTopRight;
		else if(options.distanceType == distanceType.LEFT) return distanceLeft;
		else if(options.distanceType == distanceType.CENTER) return distanceCenter;
		else if(options.distanceType == distanceType.RIGHT) return distanceRight;
		else if(options.distanceType == distanceType.BOTTOMLEFT) return distanceBottomLeft;
		else if(options.distanceType == distanceType.BOTTOM) return distanceBottom;
		else if(options.distanceType == distanceType.BOTTOMRIGHT) return distanceBottomRight;
		else if(options.distanceType == distanceType.AVERAGE) return (distanceTopLeft + distanceCenter + distanceBottomRight) / 3;
		
		// we shouldn't reach this, throw an error
		throw new Error('Distance calculation error: distanceType is ' + options.distanceType);
	}