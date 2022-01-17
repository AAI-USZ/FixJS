function(message, con) {
                    var tabid = con.sender.tab.id
                    var path = 'icons/icon16.png'
                    chrome.pageAction.show(tabid)
                    chrome.pageAction.setIcon({tabId:tabid, path: path})
                }