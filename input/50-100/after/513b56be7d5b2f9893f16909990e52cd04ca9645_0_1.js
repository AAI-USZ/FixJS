function(){
				console.log('active');
				if (buttonsVisible == false){
					buttonsVisible = true;
					controls.css({'display': 'block', 'opacity':'1', 'z-index':'42',});
				}
				else{
					buttonsVisible = false;
					controls.hide();
				};
			}