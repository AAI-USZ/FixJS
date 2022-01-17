function() {
        //continue only if the navigation history is greater than 2
        //if it is greater than 2 it means the user has traversed beyond a view that is not the main view
        //console.log("length of navigation history: " + $.UINavigationHistory.length);
        if($.UINavigationHistory.length <= 2){
            return false;
        }
		$($.UINavigationHistory[$.UINavigationHistory.length-1]).attr( "ui-navigation-status", "upcomingIntermediate");
		var poppedViewId = $.UINavigationHistory.pop();
        $(poppedViewId).trigger("Navigate_Back");
		//after a small timeout switch this popped view to "upcoming" status
		setTimeout(function(){
			$(poppedViewId).attr( "ui-navigation-status", "upcoming");
		}, 700);
		$($.UINavigationHistory[$.UINavigationHistory.length-1]).attr("ui-navigation-status", "current");
		if ($.app.attr("ui-kind")==="navigation-with-one-navbar" && $.UINavigationHistory[$.UINavigationHistory.length-1] === "#main") {
			$("navbar > uibutton[ui-implements=back]", $.app).css("display","none");
		}
	}