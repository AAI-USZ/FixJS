function(data) {
						// Hide loading animation
						jQuery('#contactable-loading').css({display:'none'}); 

						// Check for a valid server side response
						if( data.response === 'success') {
							jQuery('#contactable-callback').show().append(options.recievedMsg);
							if(options.hideOnSubmit === true) {
								//hide the tab after successful submition if requested
								jQuery('#contactable-contactForm').animate({dummy:1}, 2000).animate({"marginLeft": "-=450px"}, "slow");
								jQuery('#contactable-inner').animate({dummy:1}, 2000).animate({"marginLeft": "-=447px"}, "slow").animate({"marginLeft": "+=5px"}, "fast"); 
								jQuery('#contactable-overlay').css({display: 'none'});	
							}
						} else {
							jQuery('#contactable-callback').show().append(options.notRecievedMsg);
							setTimeout(function(){
								jQuery('.contactable-holder').show();
								jQuery('#contactable-callback').hide().html('');
							},2000);
						}
					}