function (_channelName, _date) {
			var html = '',
				schedTemplate = Util.getElementFromCache('#sched_tpl').html(),
				$schedList = Util.getElementFromCache('#sched_list');
			if (!SKYCABLE_SCHEDULES[_date][_channelName]) {
				$schedList.html('');
				navigator.notification.alert(
					'Aw snap, no schedules available for this date',
					function () {},
					'Oop, no sched :(',
					'Ayt'
				);
				Util.getElementFromCache('#sched_list_page').find('button.sched_list_back_button').trigger(TAP);
				return;
			}	
			
			for (var p in SKYCABLE_SCHEDULES[_date]) {
				if (p.toUpperCase() === _channelName.toUpperCase()) {				
					var scheds = SKYCABLE_SCHEDULES[_date][p],
						len = scheds.length;
					for (var i=0; i<len; i++) {
						html += schedTemplate
									.replace('{time}', scheds[i].time)
									.replace('{title}', scheds[i].title)
									.replace('{desc}', scheds[i].desc)
									.replace('{meta}', scheds[i].time+'|'+scheds[i].title+'|'+_channelName+'|'+_date);
					}
					break;
				}
			}
			$schedList.html(html).removeClass('hide');	
		}