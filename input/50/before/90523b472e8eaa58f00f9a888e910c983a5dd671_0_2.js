function(){
		Dashboard.presser = 
		$(".loading").hide();
		$(".main").show();
		Presser.init(Dashboard.onPressStart, Dashboard.onPressFinish);	
	}