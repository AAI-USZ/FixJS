function(e) {
	if (e.success) {
		alert('Success:\\n' + 'Count: ' + e.messages.length);

		var fromUser, post;

		for (var i = 0; i < e.messages.length; i++) {
			var message = e.messages[i];
			//alert('id: ' + message.id + '\\n' + 'make: ' + message.content);

			if ((message.from_id !== Ti.App.Properties.getString('userid')) && (message.to_id !== Ti.App.Properties.getString('userid')))
				return;

			var messageRow = Ti.UI.createTableViewRow();

			if (!fromUser)
				fromUser = getUser(message.from_id);
			if (!post)
				post = getPost(message.post_id);

			var messageUserLabel = Ti.UI.createLabel({
				text : fromUser.username,
				left : '5dp',
				right : '5dp',
				top : '5dp',
				font : {
					fontWeight : 'bold',
					fontSize : '14dp'
				},
				color : '#000000'
			});

			var messageContentLabel = Ti.UI.createLabel({
				left : '5dp',
				right : '5dp',
				top : '22dp',
				text : post.content,
				font : {
					fontSize : '14dp'
				},
				color : '#000000'
			});

			messageUserLabel.textAlign = 'left';
			messageContentLabel.textAlign = 'left';

			messageRow.add(messageUserLabel);
			messageRow.add(messageContentLabel);

			chatlistData.push(messageRow);

		}
		chatlistTable.setData(chatlistData);
	} else {
		alert('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
	}
}