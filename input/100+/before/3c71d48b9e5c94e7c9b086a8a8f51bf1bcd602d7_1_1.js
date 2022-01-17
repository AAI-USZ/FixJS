function() {
				var colspan = $(this).data('colspan');
				
				// damn you chrome!
			    if(!window.chrome || $('section.group').size() % 2 != 1 || i< $('section.group').size()-1){
			    	$(this).width( ((100 / columns) * colspan) + '%');
			    } else if($('section.group').size() % 2 == 1){
			    	$(this).width((Math.floor((1000 / columns) * colspan + 1)/10 ) + '%');
			    }
			    i++;
			}