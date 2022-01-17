function( err, results ){
			if ( err ){
				console.log("[NotificationAction.addUserNotification] error - "+err);
				callback( null, new Array());
			}
			else {
				callback( null, addedUserNotifications );
			}
		}