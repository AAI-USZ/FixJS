function(selector){
	var s1 = $(selector);
	var s1margin = (0 - s1.height() / 2 + 2).toString();
	s1.css('margin-top',s1margin+'px');
}