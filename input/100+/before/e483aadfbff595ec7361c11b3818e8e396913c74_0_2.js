function() {
		var parent = $.UINavigationHistory[$.UINavigationHistory.length-1];
		$.UINavigationHistory.pop();
		$($.UINavigationHistory[$.UINavigationHistory.length-1])
		.attr('ui-navigation-status', 'current');
		$(parent).attr('ui-navigation-status', 'upcoming');
		if ($.app.attr('ui-kind')==='navigation-with-one-navbar' && $.UINavigationHistory[$.UINavigationHistory.length-1] === '#main') {
			$('navbar > uibutton[ui-implements=back]', $.app).css('display','none');
		}
	}