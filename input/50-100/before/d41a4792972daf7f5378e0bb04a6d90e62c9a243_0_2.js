function playAnimation(){
	currentDay = slider.getValue();
	if(currentDay < slider.getMax()){
		setInterval(function(){sigInst.HideWrongTimeNodes(+1)},1000);
	}else{
		slider.setValue(0);
	}
}