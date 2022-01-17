function (data) {
                         var res = $(data.responseXML).find('popular'),
                         suggests = [];
                         for (var i=0, len = res.length; i<len; i++) {
                             suggests.push($(res[i]).text());
                         }
                         var popup = chrome.extension.getViews({type: 'popup'})[0];
                         popup && popup.renderSuggests(suggests);
                     }