function() {
			if (xhr.readyState === 4) {
				if (xhr.status === 0) { // нет соединения с интернетом
					chrome.browserAction.setIcon({'path' : chrome.extension.getURL('pic/icon19_offline.png')});
					chrome.browserAction.setBadgeText({'text' : ''});
					
					w.setTimeout(function() {
						whoami.apply(w, args);
					}, 1000);
				} else {
					chrome.browserAction.setIcon({'path' : chrome.extension.getURL('pic/icon19.png')});
					chrome.browserAction.setBadgeText({'text' : ''});
					
					var matches = xhr.responseText.match(/<title>(.*)<\/title>/);
					if (matches[1].length <= 7) { // беда с кодировкой ВКонтакте, поэтому легче проверить на длину строки
						var liMatch = xhr.responseText.match(/<li id="myprofile" class="clear_fix">(.*?)<\/li>/);
						var hrefMatch = liMatch[1].match(/href=".*?"/gm);
						var nickname = hrefMatch[1].substring(7, hrefMatch[1].length-1);
						
						fnUser(nickname);
					} else {
						fnGuest();
					}
				}
			}
		}