function (e, _data) {
				Util.getElementFromCache('#date_list_page h1').text(_data.name);	
				Skycable.populateDateListForChannel(_data.name);			
				// Set the "data-send" attr of the sched list back button for
				// it to know which channel to go back to. (A sort of breadcrumb)	
				Util.getElementFromCache('button.sched_list_back_button').attr('data-send', JSON.stringify({
					'channel': _data.channel,
					'name': _data.name
				}));				
				// When date list page is called from channel list page, scroll to date today. //
				if (typeof _data.from !== 'undefined') {
					if (Util.getElementFromCache('#date_list').find('li.today').length) {								
						Util.scrollTo(Util.getElementFromCache('#date_list').find('li.today')[0]);	
					}	
				}
			}