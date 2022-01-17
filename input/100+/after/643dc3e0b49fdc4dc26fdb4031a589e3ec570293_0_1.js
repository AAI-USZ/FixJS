function renderChannelsGroup() {

		// DRY Alert!
		// This function is needed in other components.
		function getLogo(channel) {
			if (!channel.links) { return; }
			var foundif = false, t = channel.links.length;
			while (t--) { if (channel.links[t].rel === "logo") { foundit = channel.links[t]; } }
			return foundit;
		}
		// grab selected channels from channel model
		_channels = ChannelModel[c.GROUPS][ChannelModel[c.SELECTED_GROUP]], i = 0, t = _channels.length, rows = [], list = [];

		// iterate channel collection
		for (i; i < t; i++) {
			// create a new channel row for the grid
			rows.push('<div class="channel-container" id="cc_' + _channels[i].id + '" style="top:' + (i * g.ROW_HEIGHT) + 'px"></div>');
			// and a channel logo on the side bar
			list.push('<li><div class="picture"><img class="loading" title="' + _channels[i].name + '" data-src="http://www.upc.nl' + getLogo(_channels[i]).href + '?size=medium" data-channelid="' + _channels[i].id + '" id="channelImg' + _channels[i].id + '" /></div></li>');
		}

		// append to DOM
		$('#grid-container').html(rows.join('\n'));
		$('#channels-bar-list').html(list.join('\n'));

		return;

	}