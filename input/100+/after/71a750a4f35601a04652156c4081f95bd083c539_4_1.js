function(dbClient, nikeUID, nikeOAuthToken, nikeAccessToken) {
	var user = null;
	for (var userID in users) {
		if (users[userID].nikeUID == nikeUID) {
			user = users[userID];
			dbClient.query('update Users set nikeOAuthToken = ?, nikeAccessToken = ? where userID = ?;',
							[nikeAccessToken, nikeAccessToken, userID]);
		}
	}
	if (user == null) {
		userID = maxUserID+1;
		maxUserID += 1;
		var user = {userID: userID, nikeAccessToken: nikeAccessToken, nikeOAuthToken: nikeOAuthToken, nikeUID: nikeUID};
		dbClient.query('insert into Users (userID, nikeUID, nikeOAuthToken, nikeAccessToken) values (?,?,?,?);',
							[userID, nikeUID, nikeOAuthToken, nikeAccessToken]);
		users[userID] = user;
	}
	return user.userID;
}