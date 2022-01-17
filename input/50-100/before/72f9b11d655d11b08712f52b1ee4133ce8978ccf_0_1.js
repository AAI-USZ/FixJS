function(){
			var ele = $(this).parents('.editorField');
			var align = $('textarea', ele).css('text-align');
			if(!align) align = 'center';
			$('a.icon-align-' + align, $(this)).addClass('selected'); 
		}