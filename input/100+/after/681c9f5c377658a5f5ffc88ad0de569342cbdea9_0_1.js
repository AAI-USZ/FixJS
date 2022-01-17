function getColumnIndexOfKabine(event){
		
		var kabinen = t.calendar.options.kabinen;
		if( kabinen == undefined 
				|| event == undefined 
				|| event.kabine == undefined
				|| t.calendar.options.showKabinen == undefined 
				|| t.calendar.options.showKabinen == false)
			return 0;
		
		for(var i = 0; i< kabinen.count; i++){
			if(event.kabine == kabinen.names[i] || event.kabine == i){
				return i;
			}
				
		}
		return 0;
	}