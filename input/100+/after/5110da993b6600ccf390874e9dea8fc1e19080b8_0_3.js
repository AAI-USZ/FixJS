function(){
	if (options.hz_enable_main === 'true') $content.off('mouseenter', '.Mn img', hoverzoom);
	if (options.hz_enable_icon === 'true') $('body').off('mouseenter', '.Ut', hoverzoom);
	if (options.hz_enable_link === 'true') $content.off('mouseenter', '.ot-anchor', hoverzoom);

	$('#hoverzoom_db').removeClass('enable');
	if (options.hz_ecomode === 'true'){
		ecomode.stop();
	} else {
		timer.stop();
	}
}