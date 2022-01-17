function( userId, user ){
			if( user.videoOver ){
                userCount[user.videoOver] = (userCount[user.videoOver] || 0) + 1;
            };
        }