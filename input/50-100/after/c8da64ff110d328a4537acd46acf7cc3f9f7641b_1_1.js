function domobiles() {
    
    var mobsafari = (/iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase()));
    var mobile =(/android|blackberry/i.test(navigator.userAgent.toLowerCase()));
    if (!mobile && !mobsafari) {
	$('frontbox').style.width =  "558px";
    }
    if (mobsafari) {
	$('email').type = "email";
    }
    
}