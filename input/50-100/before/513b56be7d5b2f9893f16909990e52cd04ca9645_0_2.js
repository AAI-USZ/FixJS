function(photo){
			var buttonsVisible = false,
				controls = $('.controls', photo);
				
			photo.on('hover', function(){
				if (buttonsVisible == false){
					buttonsVisible = true;
					controls.show();
				}
				else{
					buttonsVisible = false;
					controls.hide();
				};
			});

		}