function(e) {
	Cloud.Objects.create({
		classname : 'messages',
		fields : {
			post_id : chatWin.postId.id,
			from_id : Ti.App.Properties.getString('userid'),
			to_id : chatWin.to_id.id,
			content : message.value,
			is_reply : replying
		}
	}, function(e) {
		if (e.success)
			refresh();
		else
			alert('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
	});

}