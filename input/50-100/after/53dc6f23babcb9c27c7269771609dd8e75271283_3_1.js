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