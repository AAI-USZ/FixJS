function(html){
			jQuery.fancybox({
				'content':html,
				'onComplete': function(){
					jQuery.event.trigger( "newContent", ['fancy', jQuery('#fancybox-content')] );
				}
			});
		}