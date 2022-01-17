function(){
			//remove highlight on all instances of word.
			$('.incorrect:contains(' + data.currentEl.text() + ')').removeClass('incorrect').attr('contenteditable', true);
			read(data.currentEl.text());
			
			$('.menu').hide();
		}