function() {
              details.handled = true;
              chrome.browserAction.setBadgeText(details);
              return false;
            }