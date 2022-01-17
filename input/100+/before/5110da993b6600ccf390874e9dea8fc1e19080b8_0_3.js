function(){
	if (options.hz_enable_main === 'true') $content.off('mouseenter', selectors[15]+' img', hoverzoom);
	if (options.hz_enable_icon === 'true') $('body').off('mouseenter', selectors[2], hoverzoom);
	if (options.hz_enable_link === 'true') $content.off('mouseenter', selectors[3], hoverzoom);

	$('#hoverzoom_db').removeClass('enable');
	if (options.hz_ecomode === 'true'){
		ecomode.stop();
	} else {
		timer.stop();
	}
}