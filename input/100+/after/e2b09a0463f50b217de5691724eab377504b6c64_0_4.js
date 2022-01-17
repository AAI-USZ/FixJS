f		var form = jQuery(this);
		try {
			submitValue = "";
			pressedButton = arguments[0].originalEvent.explicitOriginalTarget;
			submitValue = "&" + encodeURI(pressedButton.name + "=" + pressedButton.value);
		} catch(ex){
		}
		//jQuery.ajax({'type':'post', 'url':jQuery('#FancyChooseSubmitLink').attr('value'),'data':form.serialize() + submitValue,'cache':false,'success':function(html){
		jQuery.ajax({'type':'post', 'url':form.attr('action'),'data':form.serialize() + submitValue,'cache':false,'success':function(html){
			ajaxResponceHandler(html, 'fancy', true);
		},
		'error':function(xhr){
			ajaxResponceHandler(xhr.responseText, 'fancy', true); //xhr.status //xhr.statusText
		},
		});
		return false;
	});
