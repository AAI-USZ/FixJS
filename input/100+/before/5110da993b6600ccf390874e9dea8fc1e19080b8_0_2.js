function(){
	if (options.hz_enable_main === 'true') $content.on('mouseenter', selectors[15]+' img', hoverzoom);
	if (options.hz_enable_icon === 'true') $('body').on('mouseenter', selectors[2], hoverzoom);
	if (options.hz_enable_link === 'true') $content.on('mouseenter', selectors[3], hoverzoom);

	$('#hoverzoom_db').addClass('enable');
	if (options.hz_ecomode === 'true'){
		ecomode.start();
	} else {
		timer.start();
	}
}