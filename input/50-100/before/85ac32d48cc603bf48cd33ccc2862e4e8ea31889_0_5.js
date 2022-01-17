function(){
			$.each($(eId).find('.cCheck'), function(){
				if($(this).prop('checked')==true){
					$(this).parents('.console_row').remove();
				}
			});
			refreshCounter();
		}