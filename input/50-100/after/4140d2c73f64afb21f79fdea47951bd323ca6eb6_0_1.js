function () {
			if (doneBuildingChannelList) {return;}
			doneBuildingChannelList = true;
			var html = '',
				$channelList = Util.getElementFromCache('#channel_list');
			for (var p in _CHANNELS) {
				html += '<li><a href="#date_list_page" data-send=\'{"channel":"'+_CHANNELS[p]+'","name":"'+p+'","from":"channel"}\' class="page_link channel_link">'+p+'</a></li>';
			}
			if ($channelList.length) {
				$channelList.html(html);
			}
			Util.getElementFromCache('#channel_list_page').removeClass('hide');			
		}