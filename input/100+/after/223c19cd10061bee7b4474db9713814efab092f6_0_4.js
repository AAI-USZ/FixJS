function(){

	$("#selector").css("width",$("#selectorCon").width() - 30);

	$("#selectorImg").css("bottom",25 - ($("#lcFull").height()/2));

	if (_selPos !== undefined){

		$("#selectorImg").css("left",_selPos.position().left + ((_selPos.width() - 140)/2) + 10);

	}

	else {

		$("#selectorImg").css("left",$("#vuFull").position().left + (($("#vuFull").width() - 140)/2) + 10);

	}

}