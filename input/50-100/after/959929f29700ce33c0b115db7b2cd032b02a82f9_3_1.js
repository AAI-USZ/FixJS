function(item){
		// edit this for your own custom function/callback:
        $('.fg-menu li a',container).removeClass(options.callerOnState);
        $(item).addClass(options.callerOnState);

        KYT.vent.trigger("menuItem", $(item).attr('rel'));
        return false;
	}