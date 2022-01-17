function displayChannels() {
    var $channel_list = $('#channel-list'), $list = $('<ul></ul>');
    $channel_list.html($list);
    for(var x in channels){
	$('#channel-list>ul').append('<li id="channel-'+x+'" title="'+channels[x].feed.slice(0,-5)+'">'+channels[x].channel+'</li>');
	$('#channel-'+x).bind(
			       'click'
	                       ,{channel: channels[x].channel, feed: channels[x].feed}
			       ,function(event) {
				   //loadChannel(event.data.channel);
				   var parts = event.data.feed.split("/");
				   window.location.hash = "/"+parts[1]+"/"+parts[2]+"/";
			       });
    }
}