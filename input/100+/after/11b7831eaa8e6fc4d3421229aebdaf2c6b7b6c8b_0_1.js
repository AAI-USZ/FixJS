function(details) {
    var language, contentType = getContentTypeFromHeaders(details.responseHeaders);

    if (contentType !== 'html') {
      language = detectLanguage(contentType, details.url);

      if (language) {
        chrome.tabs.insertCSS(details.tabId, { file: 'css/reset.css' });
        chrome.tabs.insertCSS(details.tabId, { file: 'css/main.css' });
        chrome.tabs.insertCSS(details.tabId, { file: 'css/' + localStorage.getItem('theme') + '.css' });
        chrome.tabs.executeScript(details.tabId, { file: 'js/lib/highlight.js' }, function() {
          chrome.tabs.executeScript(details.tabId, { file: 'js/languages/' + language + '.js' }, function() {
            if (/javascript|json/.test(language)) {
              chrome.tabs.executeScript(details.tabId, { file: 'js/lib/beautify.js' }, function() {
                chrome.tabs.executeScript(details.tabId, { code: JS_BEUTIFY_CODE }, function() {
                  chrome.tabs.executeScript(details.tabId, {
                    code: getHighlightingCode(localStorage.getItem('font'), language, localStorage.getItem('lineNumbers'))
                  });
                });
              });
            } else {
              chrome.tabs.executeScript(details.tabId, {
                code: getHighlightingCode(localStorage.getItem('font'), language, localStorage.getItem('lineNumbers'))
              });
            }
          });
        });
      }
    }
  }, { urls: ["<all_urls>"], types: ['main_frame'] }