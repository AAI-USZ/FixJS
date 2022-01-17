function(){
			data.currentEl.text($(this).text()).removeClass('incorrect').attr('contenteditable', true);
			read($(this).text());
			
			$('.menu').hide();
		}