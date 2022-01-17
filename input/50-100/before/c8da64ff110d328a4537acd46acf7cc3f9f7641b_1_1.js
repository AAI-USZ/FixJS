function domobiles() {
	var mobile =(/iphone|ipad|ipod|android|blackberry/i.test(navigator.userAgent.toLowerCase()));
	if (!mobile) {
		$('frontbox').style.width =  "558px";
	}

}