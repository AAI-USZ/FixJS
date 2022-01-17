function openInFancy(elem){
		var url = elem.attr('href');
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
		},
		'error':function(xhr){
			ajaxResponceHandler(xhr.responseText, 'ajax'); //xhr.status //xhr.statusText
		},
		});
		return false;
	}