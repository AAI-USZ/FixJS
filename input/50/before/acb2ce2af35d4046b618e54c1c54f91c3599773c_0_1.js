function(data){
					Snipt.message.flash('success', 'Successfully posted! <a href="http://snipt.net' + data.absolute_url + '">View snipt</a>');
					document.getElementById('post-snipt').reset();
				}