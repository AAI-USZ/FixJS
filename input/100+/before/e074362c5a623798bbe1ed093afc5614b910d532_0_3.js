function submitForm() {
				// Display loading animation
				jQuery(this_id_prefix+'.holder').hide();
				jQuery(this_id_prefix+'#loading').show();
				
				// Trigger form submission if form is valid
				jQuery.ajax({
					type: 'POST',
					url: options.url,
					data: {
						subject:options.subject, 
						name:jQuery(this_id_prefix+'#name').val(), 
						email:jQuery(this_id_prefix+'#email').val(), 
						issue:jQuery(this_id_prefix+'#dropdown').val(), 
						message:jQuery(this_id_prefix+'#message').val()
					},
					success: function(data) {
						// Hide loading animation
						jQuery(this_id_prefix+'#loading').css({display:'none'}); 

						// Check for a valid server side response
						if( data.response === 'success') {
							jQuery(this_id_prefix+'#callback').show().append(options.recievedMsg);
							if(options.hideOnSubmit === true) {
								//hide the tab after successful submition if requested
								jQuery(this_id_prefix+'#contactForm').animate({dummy:1}, 2000).animate({"marginLeft": "-=450px"}, "slow");
								jQuery(this_id_prefix+'div#contactable_inner').animate({dummy:1}, 2000).animate({"marginLeft": "-=447px"}, "slow").animate({"marginLeft": "+=5px"}, "fast"); 
								jQuery(this_id_prefix+'#overlay').css({display: 'none'});	
							}
						} else {
							jQuery(this_id_prefix+'#callback').show().append(options.notRecievedMsg);
							setTimeout(function(){
								jQuery(this_id_prefix+'.holder').show();
								jQuery(this_id_prefix+'#callback').hide().html('');
							},2000);
						}
					},
					error:function(e){
						jQuery(this_id_prefix+'#loading').css({display:'none'}); 
						jQuery(this_id_prefix+'#callback').show().append(options.notRecievedMsg);
					}
				});		
			}