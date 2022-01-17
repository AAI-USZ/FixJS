f	if (data.indexOf('{')===0){
		eval('var data = ' + data + ';');
	}
	if (data.hash){
		if (asFancy){
			jQuery.fancybox({
				'href':glob.hashToUrl(data.hash),
				'onComplete': function(){
					jQuery.event.trigger( "newContent", ['fancy', jQuery('#fancybox-content')] );
				}
			});
		} else {
			if (glob.prefix && window.location.pathname != glob.prefix){
				window.location.pathname = glob.prefix + '#' + data.hash;
			} else {
				window.location.hash = data.hash;
			}
		}
	} else if (data.fancy){
		jQuery.fancybox({
			'href':data.fancy,
			'onComplete': function(){
				jQuery.event.trigger( "newContent", ['fancy', jQuery('#fancybox-content')] );
			}
		});
	}else {
		var JSONBegin = data.indexOf('{');
		if (JSONBegin<5){
			var JSONLength = parseInt(data.substr(0,JSONBegin));
			if (!isNaN(JSONLength) && JSONLength>0){
				var JSONText = data.substr(JSONBegin,JSONLength);
				data = data.substr(JSONBegin+JSONLength);
				if (type != 'fancy'){
					eval('var json = ' + JSONText + ';');
					if (json.title){
						jQuery('title').text(json.title);
					}
				}
			}
		}
		if (asFancy){
			jQuery.fancybox({
				'content':data,
				'onComplete': function(){
					jQuery.event.trigger( "newContent", [type, jQuery('#fancybox-content')] );
				}
			});
		} else {
			jQuery('#changable_content').html(data);
			jQuery.event.trigger( "newContent", [type, jQuery('#changable_content')] );
		}
	}
}
