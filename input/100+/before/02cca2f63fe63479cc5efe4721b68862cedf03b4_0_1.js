function(){
					
					box.removeClass('busy');
					
					if (image.height > $(window).height()){
						var ratio = image.width / image.height;
						image.height = $(window).height() - 50;
						image.width = image.height * ratio;
					}
					
					
					$(image).hide().bind('click', function(event){
						event.preventDefault();
						event.stopPropagation();
						
						if (options['onImageClick']){
							options['onImageClick'](imageURL);
						}
						
						return false;
					});
					
					var newCss = {
						'top' : parseInt(($(window).height() - image.height) / 2),
						'left' : parseInt(($(window).width() - image.width) / 2),
						'width' : parseInt(image.width),
						'height' : parseInt(image.height)
					};
					
					if (options['animate'] == true){
						box.animate(newCss, options['animationSpeed'], afterShow);
					}
					else {
						box.css(newCss);
						afterShow();
					}
				}