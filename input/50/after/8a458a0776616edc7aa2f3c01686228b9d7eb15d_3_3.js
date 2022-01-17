function(error) {
            	this.loading_show();
                dojo.publish("/encuestame/tweetpoll/dialog/error", [error]);
            }