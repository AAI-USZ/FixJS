function() {
        // Init the page
        var that = this;
		
		//setup the menu and boot touchLayer
	    jq(document).ready(function() {
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
	    });
		
        if (window.AppMobi)
            document.addEventListener("appMobi.device.ready", function(){that.autoBoot();}, false);
        else if (document.readyState == "complete" || document.readyState == "loaded") {
            this.autoBoot();
        } else 
            document.addEventListener("DOMContentLoaded", function(){that.autoBoot();}, false);
			
        if (!window.AppMobi)
            AppMobi = {}, AppMobi.webRoot = "";
			
		//click back event
        window.addEventListener("popstate", function() {
			that.goBack();
        }, false);
		
        /**
         * Helper function to setup the transition objects
         * Custom transitions can be added via $.ui.availableTransitions
           ```
           $.ui.availableTransitions['none']=function();
           ```
         */
         this.availableTransitions = {};
         this.availableTransitions.up = this.slideUpTransition;
         this.availableTransitions.down = this.slideDownTransition;
         this.availableTransitions.fade = this.fadeTransition;
         this.availableTransitions.flip = this.flipTransition;
         this.availableTransitions.pop = this.popTransition;
         this.availableTransitions['default'] = this.slideTransition;
         this.availableTransitions['none'] = this.noTransition;
    }