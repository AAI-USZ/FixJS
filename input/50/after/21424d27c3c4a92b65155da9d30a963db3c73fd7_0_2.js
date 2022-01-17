function (item) {
			item.newAccessToken = context.newAccessToken;
			sendNotificationNow(item);
		}