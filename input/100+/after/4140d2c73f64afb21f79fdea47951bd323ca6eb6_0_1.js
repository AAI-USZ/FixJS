function (_channelName) {			
			if (Util.isEmptyObject(SKYCABLE_SCHEDULES)) { // This part should unlikely to happen because of Skycable.init() checking
				alert('Oops, there are no stored schedules');
				Ui.gotoPage('#channel_list_page');
				return;
			}
			var html = '';				
			for (var p in SKYCABLE_SCHEDULES) {
				if (Util.today.dateFormatted == p) {
					html += '<li class="today"><a href="#sched_list_page" data-send=\'{"channelName":"'+_channelName+'","date":"'+p+'"}\' class="page_link channel_link">'+p+'<small>'+Util.getDayName(p)+'</small></a><img src="assets/images/today.png"></li>';
				}
				else {
					html += '<li><a href="#sched_list_page" data-send=\'{"channelName":"'+_channelName+'","date":"'+p+'"}\' class="page_link channel_link">'+p+'<small>'+Util.getDayName(p)+'</small></a></li>';
				}				
			}
			Util.getElementFromCache('#date_list').html(html).removeClass('hide');			
		}