function (e, _data) {
				Util.getElementFromCache('#date_list_page h1').text(_data.name);	
				Skycable.populateDateListForChannel(_data.name);			
				// Set the "data-send" attr of the sched list back button for
				// it to know which channel to go back to. (A sort of breadcrumb)	
				Util.getElementFromCache('button.sched_list_back_button').attr('data-send', JSON.stringify({
					'channel': _data.channel,
					'name': _data.name
				}));
			}