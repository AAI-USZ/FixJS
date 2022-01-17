function(err) {
        var that = this;
        var msg;
        var dom = document.createElement('div');
        if (types.isSchemeError(err) && types.isExnBreak(err.val)) {
            dom['className'] = 'moby-break-error';
            msg = "Program stopped by user (user break)";
        } 
        else {
            dom['className'] = 'moby-error';
            msg = this.evaluator.getMessageFromExn(err);
        }
        
       

        if (err.domMessage) {
            //dom.appendChild(err.domMessage);
            console.log(structuredErrorToMessage(err.structuredError));
            msg = structuredErrorToMessage(err.structuredError);
        }
            
            console.log("goes here");
            var msgDom = document.createElement('div');
            msgDom['className'] = 'moby-error:message';




	    if (! types.isMessage(msg)) {
	      msgDom.appendChild(document.createTextNode(msg));
	    }
	    //if it is a Message, do special formatting
	    else {

	      var colors = [new Color(238,169,184), new Color(100, 149, 240), new Color(124,205,124), 
			    new Color(218,165,32), new Color(186,186,186)];
	      var colorIndex = 0; //WARNING
 	      
	      
	      var currItem;
	      var currColor = colors[colorIndex];
	      var args = msg.args;
	      for(var i = 0; i < args.length; i++){
		  //in the unlikely event that there are no more preset colors, choose a random one
		  if(colorIndex >= colors.length){
		    currColor = new Color(Math.floor(Math.random()*255), 
					  Math.floor(Math.random()*255), 
					  Math.floor(Math.random()*255));
		  }
		  else currColor = colors[colorIndex];
		  
		  if(types.isColoredPart(args[i])) {
		      currItem = args[i].location;
              console.log("currItem is ", currItem);
		      that.addToCurrentHighlighter(currItem.ref(0), currItem.ref(1), currItem.ref(4), currColor+'');
		      
		      var aChunk = jQuery("<span/>").text(args[i].text).css("background-color", currColor+'');
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
			
			that.addToCurrentHighlighter(currItem.location.ref(0), currItem.location.ref(1), currItem.location.ref(4), 
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
			that.addToCurrentHighlighter(locs[j].ref(0), locs[j].ref(1), locs[j].ref(4), 
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
            dom.appendChild(msgDom);

        var stacktrace = this.evaluator.getTraceFromExn(err);
        var stacktraceDiv = document.createElement("div");
        stacktraceDiv['className'] = 'error-stack-trace';
        for (var i = 0; i < stacktrace.length; i++) {
            var anchor = this.createLocationHyperlink(stacktrace[i]);
            stacktraceDiv.appendChild(anchor);
        }
        
        dom.appendChild(stacktraceDiv);
	
        return dom;
    }