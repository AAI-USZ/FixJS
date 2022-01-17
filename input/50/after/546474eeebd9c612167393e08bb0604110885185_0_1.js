function(post) {
			var uid = $jq(".posteruid", post.el).first().text();
			return uid != "(ID: Heaven)" && !onlineIDs[uid];
		}