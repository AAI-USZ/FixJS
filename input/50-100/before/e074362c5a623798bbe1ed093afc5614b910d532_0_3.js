function() {
					
					// Check the min length
					if(jQuery(this).val().length < 2) {
						jQuery(this).addClass("invalid");
						valid = false;
					}

					//Check email is valid
					if (!filter.test(jQuery(this_id_prefix+"#contactForm #email").val())) {
						jQuery(this_id_prefix+"#contactForm #email").addClass("invalid");
						valid = false;
					}						
				}