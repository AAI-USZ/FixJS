f		//if (!document.querySelector("view[ui-navigation-status=current]")) {
		if (!$("view[ui-navigation-status=current]")[0]) {
			$($.UINavigationHistory[$.UINavigationHistory.length-1])     
                .attr("ui-navigation-status", "current");
            $.UINavigationHistory.pop();
		}
		$.UINavigationEvent = false;
    });    
