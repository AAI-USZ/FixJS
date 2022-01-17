function boot(){
	$('#joshua').html('<h1>'+header+'</h1><div id="output"/>').append('<div id="input"/>');
	// version check
	var versionCheck = readCookie('release');
	if(version > versionCheck){ // upgrade to latest version
		$('title').html(title+'Upgrading...');
		$.each(windows, function(){
			eraseCookie(this);
			eraseCookie('window.'+this);
		});
		createCookie('theme', defaultTheme, expires);
		createCookie('release', version, expires);
		location.reload();
	}
	// load effects
	var fx = readCookie('fx');
	if(fx) fxInit(fx, true);
	// window positions
	$.each(windows,function(){
		var cookie = readCookie('window.'+this);
		if(cookie){
			var pos = cookie.split(',');
			$('#'+this).css({
				position: 'absolute',
				left: pos[0],
				right: pos[1],
				top: pos[2]
			});
		}
	});
	// ready prompt
	$('#input').html('<input type="text" id="prompt" autocomplete="off"/>');
	var motd = $('<div class="output"/>').load('joshua.php', {command: "motd", option: "clean"}, function(){
		motd.appendTo('#output');
		init('boot'); // initialize
	});
}