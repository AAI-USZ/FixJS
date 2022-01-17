function(){
				if($(this).prop('checked')==true && $(this).parents('.console_row').css('display')!='none'){
					$(this).parents('.console_row').remove();
				}
			}