function (e) {
            if (e.success) {
	            if (e.messages.length == 0) {
                    table.setData([
                        { title: 'No messages' }
                    ]);
                } else {
	                var data = [];
		            data.push({ title: 'Remove all messages' })
		            for (var i = 0, l = e.messages.length; i < l; i++) {
              	        var message = e.messages[i];
                        var row = Ti.UI.createTableViewRow({
                            title: message.subject,
                            id: message.id
                        });
                        data.push(row);
                    }
		            table.setData(data);
	            }
            } else {
                table.setData([
                    { title: (e.error && e.message) || e }
                ]);
                error(e);
            }
        }