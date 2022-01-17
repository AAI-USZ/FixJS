function(info, tab) {
        var url = info.pageUrl;
        var domain = getDomain(url);
        domain = domain.replace(/\./g, '\\.');
        domain = '\\.?' + domain + '$';

        chrome.tabs.create({
            url: 'get.html#!/domain=' + domain
        });
    }