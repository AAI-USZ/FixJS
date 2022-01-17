function (item) {
			item.newAccessToken = context.newAccessToken;
			try {
				sendNotificationNow(item);
			}
			catch (e) {
				// empty
			}
		}