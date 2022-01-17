function(event){
				var click = event.target.id;
				var service = click.substr(click.lastIndexOf('_') + 1, click.length);
				var cookie_name = 'privacyShareButtons_' + service;
				var checkbox = option_submenu.find('#' + event.target.id);
	
				if (checkbox.is(':checked')) {
					$.cookie(cookie_name,'perma_on',self.options.cookie_options);
					option_submenu.find('label[for=' + click + ']').addClass('checked');
				} else {
					$.cookie(cookie_name,null,self.options.cookie_options);
					option_submenu.find('label[for=' + click + ']').removeClass('checked');
				}
			}