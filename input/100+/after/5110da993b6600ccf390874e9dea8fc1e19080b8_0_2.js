function(){
	if (options.hz_enable_main === 'true') $content.on('mouseenter', '.Mn img', hoverzoom);
	if (options.hz_enable_icon === 'true') $('body').on('mouseenter', '.Ut', hoverzoom);
	if (options.hz_enable_link === 'true') $content.on('mouseenter', '.ot-anchor', hoverzoom);

	$('#hoverzoom_db').addClass('enable');
	if (options.hz_ecomode === 'true'){
		ecomode.start();
	} else {
		timer.start();
	}
}