function submitForm() {
				// Display loading animation
				jQuery('.contactable-holder').hide();
				jQuery('#contactable-loading').show();
				
				// Trigger form submission if form is valid
				jQuery.ajax({
					type: 'POST',
					url: options.url,
					data: {
						subject:options.subject, 
						name:jQuery('#contactable-name').val(), 
						email:jQuery('#contactable-email').val(), 
						issue:jQuery('#contactable-dropdown').val(), 
						message:jQuery('#contactable-message').val()
					},
					success: function(data) {
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
					},
					error:function(e){
						jQuery('#contactable-loading').css({display:'none'}); 
						jQuery('#contactable-callback').show().append(options.notRecievedMsg);
					}
				});		
			}