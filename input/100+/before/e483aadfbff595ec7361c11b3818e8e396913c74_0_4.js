function() {
		var navigateList = function(item) {
			try {
				if ($.app.attr("ui-kind")==="navigation-with-one-navbar") {
					$.app.find("navbar > uibutton[ui-implements=back]").css("display", "block");
				}
				$(item.attr("href")).attr("ui-navigation-status", "current");
				$($.UINavigationHistory[$.UINavigationHistory.length-1])
					.attr("ui-navigation-status", "traversed");
				if ($.main.attr("ui-navigation-status") !== "traversed") {
					$.main.attr("ui-navigation-status", "traversed");
				}
				$.UINavigationHistory.push(item.attr("href"));
			} catch(err) {}
		};
        $.app.delegate("tablecell", "click", function() {
            if ($(this).attr("href")) {
            	$.UINavigationListExits = true;
            	var $this = $(this);
            	setTimeout(function() {
            		$this.UIHandleTouchState();
					if ($.UINavigationEvent) {
						return;
					} else {
						$.UINavigationEnabled = true;
						$.UINavigationEvent = false;
						navigateList($this);
						$.UINavigationEvent = true;
					}
				}, 100);
            }
        });
	}