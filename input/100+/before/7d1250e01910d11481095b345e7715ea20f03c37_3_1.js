function () {
                    try {
                        var json = eval('(' + this.responseText + ')');
                        var results = json.results;
                        for (var c = 0; c < tweets.length; c++) {
                        	tweets.push({
                        		title: results[c].text,
                        		user: results[c].user.screen_name,
                        		hasChild: true
                        	});
                        }
                        
                        var tweetList = Ti.UI.createTableView({
                        	data: tweets
                        });
                    } catch (e) {
                        Ti.API.info(e);
                    }
                }