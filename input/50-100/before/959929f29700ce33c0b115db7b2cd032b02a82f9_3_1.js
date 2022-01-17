function(item){
		// edit this for your own custom function/callback:
        $('.fg-menu li a',container).removeClass(options.callerOnState);
        $(item).addClass(options.callerOnState);

        if($.address.value() == $(item).attr('rel')){
            // function added by RH 11.4.11. not in origional source
            $.address.trigger();
        }else{
            $.address.value($(item).attr('rel'));
        }
        return false;
	}