function(tx,results){
					var len = results.rows.length,i;
					var feedArray = new Array(len);
					for(i = 0;i<len;i++) {
						feedArray[i] = new Object();
						feedArray[i].url = results.rows.item(i).id;
						feedArray[i].title = results.rows.item(i).title;
						feedArray[i].label = results.rows.item(i).label;
						feedArray[i].unreadCount = results.rows.item(i).unreadCount;
					}
					callback(feedArray);
				}