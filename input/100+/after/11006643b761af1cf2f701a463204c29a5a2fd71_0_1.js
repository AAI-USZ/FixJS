function (data) {
                         var res = $.makeArray($(data.responseXML).find('recommended')).concat(
                             $.makeArray($(data.responseXML).find('recommended'))),
                         suggests = [];
                         for (var i=0, len = res.length; i<len && i<=5; i++) {
                             suggests.push($(res[i]).text());
                         }
                         var popup = chrome.extension.getViews({type: 'popup'})[0];
                         popup && popup.renderSuggests(suggests);
                     }