function() {
    	
    	if ($("img#validation-img").length) { $("img#validation-img").remove(); }
    	
	    var uri = inputUri.val();
	    
	    if(uri.charAt(uri.length-1) == "/") {
	    	uri = uri.slice(0, -1);
	    	inputUri.val(uri);
	    }
    	
    	if (validateURI(uri)) {
    		inputUri.attr("disabled", "disabled");
    		inputUri.after($('<img src="extension/rdf-extension/images/spinner.gif" width="14" height="14" alt="fetching..." class="validation" id="validation-img" />'));
		    $.post("command/rdf-extension/addStanbolService",
				    {
					    "uri": uri,
	                    "engine": JSON.stringify(ui.browsingEngine.getJSON()),
	                    "project": theProject.id
				    },
				    function(data) {
				    	
				    	var registering = $("dl#stanbol-registering");
				    	registering.parent().height($("p#stanbol-help").height());
				    	registering.parent().fadeIn("slow");
				    	$("p#stanbol-help").hide();
				    	$.each(data, function(i, obj) {
				    		//check issue #579: http://code.google.com/p/google-refine/issues/detail?id=579
				    		if (ReconciliationManager.getServiceFromUrl(obj.uri)) {
				    			self.printAddedService(registering, obj, false)
				    		} else {
					    	    ReconciliationManager.registerStandardService(obj.uri, function(index) {
					    	    	self.printAddedService(registering, obj, true)
					    	    });	
				    		}
				    	});
				    	$("img#validation-img").remove();
				    	//DialogSystem.dismissUntil(self._level - 1);
				    	dialog.find("button#register").hide();
				    	dialog.find("button#cancel").text("Close");
		            },
	                "json");
    	} else {
    		inputUri.addClass("error");
    		inputUri.after($('<img src="../extension/rdf-extension/images/no.png" width="16" height="16" alt="invalid" class="validation" id="validation-img" />'));	
    		alert("Not valid URI")
    	}
    }