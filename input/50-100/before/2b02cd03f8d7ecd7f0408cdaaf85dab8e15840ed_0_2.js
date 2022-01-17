function() {
	var $elem = $("#footDiv");
	var i = $elem[0];
	if (i) {
		var ll = i.offsetTop;
		while(i == i.offsetParent){
			ll += i.offsetTop;
			i = i.offsetParent;
		}
		
		if (ll < 800) {
			$elem.addClass("footDiv");
		}	
	}
}