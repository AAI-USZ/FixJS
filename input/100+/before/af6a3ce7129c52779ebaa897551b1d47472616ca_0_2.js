function refresh() {
	previousMessagesData = [];

	Cloud.Objects.query({
		classname : 'messages',
		page : 1,
		per_page : 100,
		order : "-created_at",
		where : {
			'post.id' : chatWin.postId.id
		}
	}, function(e) {
		if (e.success) {
			//alert('Success:\\n' + 'Count: ' + e.messages.length);

			if (e.messages.length > 0)
				replying = true;

			for (var i = 0; i < e.messages.length; i++) {
				var message = e.messages[i];
				//alert('id: ' + message.id + '\\n' + 'make: ' + message.content);

				if ((message.from_id.id !== Ti.App.Properties.getString('userid')) && (message.to_id.id !== Ti.App.Properties.getString('userid')))
					return;

				var messageRow = Ti.UI.createTableViewRow();

				var messageUserLabel = Ti.UI.createLabel({
					text : message.from_id.username,
					left : '5dp',
					right : '5dp',
					top : '5dp',
					font : {
						fontWeight : 'bold',
						fontSize : '14dp'
					},
					color : '#000000'
				});
				
				 if (message.from_id === Ti.App.Properties.getString('userid'))
				 	messageUserLabel.text += ' (You)';

				var messageContentLabel = Ti.UI.createLabel({
					left : '5dp',
					right : '5dp',
					top : '22dp',
					text : message.content,
					font : {
						fontSize : '14dp'
					},
					color : '#000000'
				});

				messageUserLabel.textAlign = 'left';
				messageContentLabel.textAlign = 'left';

				messageRow.add(messageUserLabel);
				messageRow.add(messageContentLabel);

				previousMessagesData.push(messageRow);

			}
			previousMessagesTable.setData(previousMessagesData);
		} else {
			alert('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});
}