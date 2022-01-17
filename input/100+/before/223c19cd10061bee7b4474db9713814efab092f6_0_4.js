function(){

	var selectorLeft = $("#selectorImg").position().left + 70;

	var lc = $("#lcFull").position().left+$("#lcFull").width();

	var nt = $("#ntFull").position().left+$("#ntFull").width();

	var vu = $("#vuFull").position().left+$("#vuFull").width();

	var en = $("#enFull").position().left+$("#enFull").width();

	if (selectorLeft <= lc){

		return "LC";

	}

	else if (selectorLeft <= nt){

		return "NT";

	}

	else if (selectorLeft <= vu){

		return "VU";

	}

	else if (selectorLeft <= en){

		return "EN";

	}

	else{

		return"CR";

	}

}