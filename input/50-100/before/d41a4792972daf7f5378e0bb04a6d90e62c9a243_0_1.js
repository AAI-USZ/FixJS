function(){
		currentDay = slider.getValue();
		setInterval(function(){sigInst.HideWrongTimeNodes(+1)},500);
	}