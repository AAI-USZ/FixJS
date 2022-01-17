function (feed, count) {
					console.log('mark as read successful');
					mark_read_queue[feed] = [];
					updateUnreadCount(-count);
				}