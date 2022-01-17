function(tab) {
        if (!tab || /^(?:chrome|https)/.test(tab.url)) {
          chrome.tabs.query({
            url: 'http://*/*',
            active: true,
            highlighted: true,
            windowType: 'normal'
          }, function (tabs) {
            if (tabs.length === 0) {
              chrome.tabs.query({
                url: 'https://*/*',
                active: true,
                highlighted: true,
                windowType: 'normal'
              }, function (tabs) {
                if (tabs.length === 0) {
                  chrome.tabs.query({
                    url: 'http://*/*',
                    windowType: 'normal'
                  }, function (tabs) {
                    if (tabs.length === 0) {
                      that.queue.push(url);
                      return;
                    }
                    ok(tabs[0]);
                  });
                  return;
                }
                ok(tabs[0]);
              });
              return;
            }
            ok(tabs[0]);
          });
        } else {
          ok(tab);
        }
      }