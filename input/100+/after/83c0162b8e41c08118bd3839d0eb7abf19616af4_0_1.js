function(){
		var checkBox = jQuery(this);
		var value = checkBox.val();
		var contains = false;
		for(var i = 0;i < existing.length;i++){
			if(value == existing[i]){
				contains = true;
				existing.splice(i,1);
				break;
			}
		}
		if(contains){
			checkBox.attr('checked', true);
		}else{
			checkBox.removeAttr('checked') 
		}
		checkBox.click(function(){
			CitizenCalendarSettingsHelper.subscribeCalendar(this);
		});
	}