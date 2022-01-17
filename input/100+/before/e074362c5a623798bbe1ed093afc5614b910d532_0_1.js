function() {
				
				// Validate the entries
				var valid = true
				,	params;

				//Remove any previous errors
				jQuery(this_id_prefix+"#contactForm .validate").each(function() {
					jQuery(this).removeClass('invalid');
				});

				// Loop through requigreen field
				jQuery(this_id_prefix+"#contactForm .validate").each(function() {
					
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
				});

				if(valid === true) {
					submitForm();
				}
				return false;
			}