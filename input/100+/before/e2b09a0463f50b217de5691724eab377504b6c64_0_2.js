function(){
		var url = jQuery(this).attr('href');
		if (url.indexOf('#')===0){
			url = glob.hashToUrl(url.substr(1));
		}
		jQuery.ajax({'type':'get', 'url':url,'cache':false,'success':function(html){
			jQuery.fancybox({
				'content':html,
				'onComplete': function(){
					jQuery.event.trigger( "newContent", ['fancy', jQuery('#fancybox-content')] );
				}
			});
		}});
		return false;
	}