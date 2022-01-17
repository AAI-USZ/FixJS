function(){
		  		
					var ratio = ($(this).height()/$(this).width()).toFixed(2);	//Define image ratio
					thisSlide = $(this);
					
					//Gather browser size
					var browserwidth = $(window).width();
					var browserheight = $(window).height();
					var offset;
					
					/**Resize image to proper ratio**/
					
					if ((browserheight <= options.min_height) && (browserwidth <= options.min_width)){	//If window smaller than minimum width and height
					
						if ((browserheight/browserwidth) > ratio){
							options.fit_landscape && ratio <= 1 ? resizeWidth(true) : resizeHeight(true);	//If landscapes are set to fit
						} else {
							options.fit_portrait && ratio > 1 ? resizeHeight(true) : resizeWidth(true);		//If portraits are set to fit
						}
					
					} else if (browserwidth <= options.min_width){		//If window only smaller than minimum width
					
						if ((browserheight/browserwidth) > ratio){
							options.fit_landscape && ratio <= 1 ? resizeWidth(true) : resizeHeight();	//If landscapes are set to fit
						} else {
							options.fit_portrait && ratio > 1 ? resizeHeight() : resizeWidth(true);		//If portraits are set to fit
						}
						
					} else if (browserheight <= options.min_height){	//If window only smaller than minimum height
					
						if ((browserheight/browserwidth) > ratio){
							options.fit_landscape && ratio <= 1 ? resizeWidth() : resizeHeight(true);	//If landscapes are set to fit
						} else {
							options.fit_portrait && ratio > 1 ? resizeHeight(true) : resizeWidth();		//If portraits are set to fit
						}
					
					} else {	//If larger than minimums
						
						if ((browserheight/browserwidth) > ratio){
							options.fit_landscape && ratio <= 1 ? resizeWidth() : resizeHeight();	//If landscapes are set to fit
						} else {
							options.fit_portrait && ratio >= 1 ? resizeHeight() : resizeWidth();		//If portraits are set to fit
						}
						
					}
					
					/**End Image Resize**/
					
					
					/**Resize Functions**/
					
					function resizeWidth(minimum){
						if (minimum){	//If minimum height needs to be considered
							if(thisSlide.width() < browserwidth || thisSlide.width() < options.min_width ){
								if (thisSlide.width() * ratio >= options.min_height){
									thisSlide.width(options.min_width);
						    		thisSlide.height(thisSlide.width() * ratio);
						    	}else{
						    		resizeHeight();
						    	}
						    }
						}else{
							if (options.min_height >= browserheight && !options.fit_landscape){	//If minimum height needs to be considered
								if (browserwidth * ratio >= options.min_height || (browserwidth * ratio >= options.min_height && ratio <= 1)){	//If resizing would push below minimum height or image is a landscape
									thisSlide.width(browserwidth);
									thisSlide.height(browserwidth * ratio);
								} else if (ratio > 1){		//Else the image is portrait
									thisSlide.height(options.min_height);
									thisSlide.width(thisSlide.height() / ratio);
								} else if (thisSlide.width() < browserwidth) {
									thisSlide.width(browserwidth);
						    		thisSlide.height(thisSlide.width() * ratio);
								}
							}else{	//Otherwise, resize as normal
								thisSlide.width(browserwidth);
								thisSlide.height(browserwidth * ratio);
							}
						}
					};
					
					function resizeHeight(minimum){
						if (minimum){	//If minimum height needs to be considered
							if(thisSlide.height() < browserheight){
								if (thisSlide.height() / ratio >= options.min_width){
									thisSlide.height(options.min_height);
									thisSlide.width(thisSlide.height() / ratio);
								}else{
									resizeWidth(true);
								}
							}
						}else{	//Otherwise, resized as normal
							if (options.min_width >= browserwidth){	//If minimum width needs to be considered
								if (browserheight / ratio >= options.min_width || ratio > 1){	//If resizing would push below minimum width or image is a portrait
									thisSlide.height(browserheight);
									thisSlide.width(browserheight / ratio);
								} else if (ratio <= 1){		//Else the image is landscape
									thisSlide.width(options.min_width);
						    		thisSlide.height(thisSlide.width() * ratio);
								}
							}else{	//Otherwise, resize as normal
								thisSlide.height(browserheight);
								thisSlide.width(browserheight / ratio);
							}
						}
					};
					
					/**End Resize Functions**/
					
					
					//Horizontally Center
					if (options.horizontal_center){
						$(this).css('left', (browserwidth - $(this).width())/2);
					}
					
					//Vertically Center
					if (options.vertical_center){
						$(this).css('top', (browserheight - $(this).height())/2);
					}
					
				}