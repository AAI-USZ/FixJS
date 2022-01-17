function(info, tab) {
        var url = info.pageUrl;
        var domain = getDomain(url);
        domain.replace('.', '\\.');
        domain = '\\.?' + domain + '$';

        chrome.tabs.create({
            url: 'get.html#!/domain=' + domain
        });
    }