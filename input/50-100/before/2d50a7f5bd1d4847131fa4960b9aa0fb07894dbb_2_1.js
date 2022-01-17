function(e) {
					if (e.success) {
						var post = e.posts[0];
						activityIndicator.hide();
						var homeWin = Ti.UI.createWindow({
							url: "home.js",
						});
						homeWin.open();
						//alert('Success create post:\\n' + 'id: ' + post.id + '\\n' + 'title: ' + post.title + '\\n' + 'content: ' + post.content + '\\n');
					} else {
						alert('Error in post creating:\\n' + ((e.error && e.message) || JSON.stringify(e)));
					}
				}