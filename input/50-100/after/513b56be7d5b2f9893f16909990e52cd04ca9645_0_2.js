function(photoset){
			var buttonsVisible = false,
				controls = $('.controls', photoset);//figure out how to insert id attr of photoset
			
			$('.activearea').on('hover', function(){
				console.log('active');
				if (buttonsVisible == false){
					buttonsVisible = true;
					controls.css({'display': 'block', 'opacity':'1', 'z-index':'42',});
				}
				else{
					buttonsVisible = false;
					controls.hide();
				};
			});

		}