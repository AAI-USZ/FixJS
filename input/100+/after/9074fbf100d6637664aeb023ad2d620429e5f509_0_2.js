function writeSelectableDays(max, element){
	if (element == null){
		return;
	}
	var select = 1;
	for (var i = 0; i < element.options.length; i++){
		if (element.options[i].selected == true) {
			select = i;
		}
	}
	if (select > max-1){
		select = max-1;
	}
	var s = "";
	for (var i = 1; i <= max; i++){
		s += "<option>" + i + "</option>";
	}
	element.innerHTML = s;
	element.options[select].selected = true;
}