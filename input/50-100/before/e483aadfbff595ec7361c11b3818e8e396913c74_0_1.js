function(viewID) {
		$.UINavigationListExits = true;
		$($.UINavigationHistory[$.UINavigationHistory.length-1])
			.attr("ui-navigation-status","traversed");
		$(viewID).attr("ui-navigation-status","current");
		$.UINavigationHistory.push(viewID);
		if ($.app.attr("ui-kind") === "navigation-with-one-navbar") {
			$("navbar uibutton[ui-implements=back]").css("display","block");
		}
	}