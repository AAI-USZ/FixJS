function reset(){
	eraseCookie('joshua');
	eraseCookie('release');
	eraseCookie('theme');
	eraseCookie('background');
	eraseCookie('fx');
	eraseCookie('opacity');
	$.each(windows, function(){
		eraseCookie(this);
		eraseCookie('window.'+this);
	});
	location.reload();
}