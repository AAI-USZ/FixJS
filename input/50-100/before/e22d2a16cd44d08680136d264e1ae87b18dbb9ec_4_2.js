function(i){
			
			comment = tpl({
				useravatar: data[i].user.avatar_url,
				username: data[i].user.login,
				url: data[i].user.url.split('users/')[1],
				content: data[i].body_html,
				date: formatDate(data[i].created_at),
				commenturl: data[i].url
			});
			
			// Add rendered template to 
			listing.innerHTML += comment;
	
		}