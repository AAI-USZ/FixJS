function(closenessOptions) {
			var result = [];
			
    		// use default options if not specified
		    options = jQuery.extend({
		    	sources: jQuery(),
		    	targets: jQuery(),
		    	directionType: directionType.CLOSETO,
		    	distanceType: distanceType.DIRECT,
		    	calculationType: calculationType.min,
		    	minDistance: 0,
		    	maxDistance: 0,
		    	inBounds: false,
		    	directionHasToMatchAllTargets: false,
		    	limit: false,
		    	limitPerTarget: false,
		    }, closenessOptions);
		    
			// set fitting type for distance calculations
			if(typeof options.distanceType == "undefined") {
				switch (options.directionType) {
					case directionType.CLOSETO:
						options['distanceType'] = distanceType.DIRECT;
						break;
					case directionType.CLOSETOLABEL:
						options['distanceType'] = distanceType.LEFT;
						break;
					case directionType.CLOSETOCLICKABLELABEL:
						options['distanceType'] = distanceType.LEFT;
						break;
					case directionType.ABOVE:
						options['distanceType'] = distanceType.BOTTOMLEFT;
						break;
					case directionType.BELOW:
						options['distanceType'] = distanceType.TOPLEFT;
						break;
					case directionType.LEFTOF:
						options['distanceType'] = distanceType.RIGHT;
						break;
					case directionType.RIGHTOF:
						options['distanceType'] = distanceType.LEFT;
						break;
					default:
						options['distanceType'] = distanceType.DIRECT;
				}
			}
		    
		    options.sources = jQuery(options.sources).distinctDescendants();
		    options.targets = jQuery(options.targets).distinctDescendants();
		    
//		    abmash.highlight(options.sources.get());
//			abmash.highlight(options.targets.get());
//			if(abmash.getData('test')) abmash.highlight(options.sources.get());
//			if(abmash.getData('test')) abmash.highlight(options.targets.get());

			result = abmash.checkElementLocations();
			
//			jQuery(result).css('background-color', 'yellow');
			// now unify and sort the result set
			result = result.length > 0 ? result.unique().sort(sortByCloseness) : [];
			
			// reduce the result set to the closest elements if a limit is given
			if(options.limit && options.limit > 0) result = result.splice(0, options.limit);
			
	    	jQuery.each(result, function() {
	    		var resultElement = jQuery(this);
	    		var weightModificator = 1000 / calculateDistance(resultElement);
	    		var weight = abmash.getData('weightForDirectionQuery') * abmash.getElementWeight(resultElement);
	    		var newWeight = weight ? weight + weightModificator : 1 + weightModificator;
//	    		if(abmash.getData('test'))  {
//	    			abmash.highlight(resultElement);
//	    			alert(calculateDistance(resultElement));
//	    			alert(weightModificator);
//	    			alert("weight: " + weight);
//	    			alert("newWeight: " + newWeight);
//	    		}
	    		abmash.setElementWeight(resultElement, newWeight);
	    	});

			
			return jQuery(result);
    	}