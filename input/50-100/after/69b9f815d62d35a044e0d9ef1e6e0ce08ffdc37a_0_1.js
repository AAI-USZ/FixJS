function() {
			//setup the menu
	        if (jq("nav").length > 0) {
	            jq("#jQUi #header").addClass("hasMenu off");
	            jq("#jQUi #content").addClass("hasMenu off");
	            jq("#jQUi #navbar").addClass("hasMenu off");
	        }
			//boot touchLayer
			//TODO: touchLayer should be initiated here, but requires jQUI element to exist
			//if $.ui.launch can optionally create the jQUI object, we should had that option here somehow...
	        jQUi = document.getElementById("jQUi");
			$.touchLayer(jQUi);
	    }