function(data){
		if (data.message.indexOf(API.getSelf().username)!=-1){
			var message = {};
			message.image = "http://www.plug.dj/images/avatars/thumbs/" + API.getUser(data.fromID).avatarID + ".png";
			message.title = "Chat";
			message.text = data.from + " said: \"" + data.message + "\"";
			firePPEvent(message);
		}
	}