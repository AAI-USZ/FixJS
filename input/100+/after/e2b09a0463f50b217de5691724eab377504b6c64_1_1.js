function initLinks(type, contentParent){
		if (typeof(contentParent) === 'undefined') return;
		if (glob.prefix && window.location.pathname != glob.prefix){
			contentParent.find('a[href*="' + glob.prefix + '"]:not(a[href*="#"]):not(.fancyChoose):not(.noAjax)').each(function(){
				$(this).attr('href', glob.prefix + "#" + $(this).attr('href').substr(glob.prefix.length));
			});
		} else {
			contentParent.find('a[href*="' + glob.prefix + '"]:not(.fancyChoose):not(.noAjax)').each(function(){
				$(this).attr('href', "#" + $(this).attr('href').substr(glob.prefix.length));
			});
		}
	}