function(ps, url) {
      var that = this;
      if (!/^(?:http|data)/.test(url)) {
        return fail('ps.itemUrl is not URL');
      }

      // Now, latest version of Chromium, background and chrome url pages cannot download images.
      // So at first, we search normal http url tab in all tabs.
      // If it is found, we request download operation to this tab.
      // But if it is not found, we enqueue img url to this model, and at next Local post request,
      // we retry queue contents.
      function executor(urls) {
        function dispatch(url) {
          var ev = document.createEvent('MouseEvents');
          ev.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, true, false, false, 0, null);
          var anchor = document.createElement('a');
          anchor.href = url;
          anchor.dispatchEvent(ev);
        }

        urls.forEach(function downloader(url) {
          if (/http|https/.test(url)) {
            dispatch(url);
          } else {
            // probably data url
            var data = url.replace(/^.*?,/, '');
            var binary = window.atob(data);
            var buffer = new ArrayBuffer(binary.length);
            var view = new Uint8Array(buffer);
            for (var i = 0, len = binary.length; i < len; ++i) {
              view[i] = binary.charCodeAt(i);
            }
            var builder = new (window.BlobBuilder || window.WebKitBlobBuilder);
            var URL = window.URL || window.webkitURL;
            builder.append(buffer);
            dispatch(URL.createObjectURL(builder.getBlob('image/png')));
          }
        });
      }

      function ok(tab) {
        var ary;
        if (that.queue.length !== 0) {
          ary = that.queue;
          that.queue = [];
          ary.push(url);
        } else {
          ary = [ url ];
        }
        var code = '(' + executor.toString() + '(' + JSON.stringify(ary) + '))';
        chrome.tabs.executeScript(tab.id, {
          code: code
        }, function() { });
      }

      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, function (tabs) {
        if (tabs.length === 0 || /^(?:chrome|https)/.test(tabs[0].url)) {
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
          ok(tabs[0]);
        }
      });
      return succeed();
    }