function(findingsUser) {
							if(!findingsUser.isLoggedIn) {
								_this.log("User is not logged into Findings...aborting import.");
								if(desktopNotifyAllowed) {
									_this.showNotification("notify_kindle_import_failed_findings_login.html");
								}
							} else { // Findings login OK, too...initiate import!
								_this.log("All systems go for Kindle import...")
								kindle_importer.start(FDGS);
								if(_this.amazonPinger == null) {
									_this.createAmazonPinger(); //ping Amazon every 5 min to stay logged in
								}
								chrome.browserAction.setIcon({"path": "icon-16x16-working.png"});
							}
						}