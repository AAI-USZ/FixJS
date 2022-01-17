function(that, msgDom, msg) {
        //pink, blue, green, yellow, gray
    	var colors = [new Color(238,169,184), new Color(145, 191, 219), new Color(127,191,123), 
    		      new Color(175,141,195), new Color(186,186,186)];
    	var colorIndex = 0;
    	
    	var currItem;
    	var currColor = colors[colorIndex];
    	var args = msg.args;
        //FIXME take out var
    	for(var i = 0; i < args.length; i++){
    	    //in the unlikely event that there are no more preset colors, reset it
    	    if(colorIndex >= colors.length){
        		colorIndex = 0;
    	    }
    	    currColor = colors[colorIndex];
    	    
    	    if(types.isColoredPart(args[i])) {
        		currItem = args[i].location;
        		that.addToCurrentHighlighter(currItem.ref(0), currItem.ref(1), currItem.ref(2), currItem.ref(3), currItem.ref(4), currColor+'');
        		var aChunk = jQuery("<span/>").text(args[i].text+'').css("background-color", currColor+'');
        		jQuery(msgDom).append(aChunk);
        		
        		colorIndex++;
    	    } 
            else if(types.isGradientPart(args[i])) {
        		var parts = args[i].coloredParts;
        		
        		var percentage = 1;
        		var change = 1/(parts.length+1);
        		
        		var currTint;
        		for(var j = 0; j < parts.length; j++) {	    
        		    currItem = parts[j];
        		    currTint = nextTint(currColor.red, currColor.green, currColor.blue, percentage);
        		    
        		    that.addToCurrentHighlighter(currItem.location.ref(0), currItem.location.ref(1), currItem.location.ref(2), currItem.location.ref(3), currItem.location.ref(4), 
        						 currTint);
        		    
        		    var aChunk = jQuery("<span/>").text(currItem.text).css("background-color", currTint);
        		    jQuery(msgDom).append(aChunk);		     
        		    percentage = percentage - change;
        		}
        		
        		colorIndex++;
    	    }
    	    
    	    else if(types.isMultiPart(args[i])) {
        		var locs = args[i].locations;
        		
        		for(var j = 0; j <locs.length; j++){
        		    that.addToCurrentHighlighter(locs[j].ref(0), locs[j].ref(1), locs[j].ref(2), locs[j].ref(3), locs[j].ref(4), 
        						 currColor);
        		}
        		var aChunk = jQuery("<span/>").text(args[i].text).css("background-color", currColor+'');
        		jQuery(msgDom).append(aChunk);
        		
        		colorIndex++;
    	    } 
            else {
    		    msgDom.appendChild(document.createTextNode(args[i]+''));
    	    }
    	}	
    }