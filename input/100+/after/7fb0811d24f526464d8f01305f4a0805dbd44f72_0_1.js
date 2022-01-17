function (link) {
					// show and spin progress indicator
					$('#progress_wrapper').removeClass('hidden').addClass('spinning');
					
					console.log('getting link from instapaper');
					hide_popover();
					ip.getArticle(link, instapaperText);
				}