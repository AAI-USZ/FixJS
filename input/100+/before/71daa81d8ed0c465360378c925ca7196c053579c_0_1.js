function(event) {
					var comments = WDN.jQuery('#wdn_feedback_comments textarea').val();
					if (comments.split(' ').length < 4) {
						// Users must enter in at least 4 words.
						alert('Please enter more information, give me at least 4 words!');
						return false;
					}
					WDN.jQuery('#wdn_feedback_comments form input[type="submit"]').attr('disabled', 'disabled');
					WDN.post(
						'http://www1.unl.edu/comments/', 
						WDN.jQuery('#wdn_feedback_comments').serialize()
					);
					WDN.jQuery('#wdn_feedback_comments').hide();
					WDN.jQuery('#footer_feedback').append('<h4>Thanks!</h4>');
					event.stopPropagation();
					return false;
				}