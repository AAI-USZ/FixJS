function( response ) {
                
                // TODO                

                if (chrome && chrome.browserAction) {
                    chrome.browserAction.setBadgeBackgroundColor({color : [255, 0, 0, 255]});
                    self.updateUnreadNotifCount();
                }
            }