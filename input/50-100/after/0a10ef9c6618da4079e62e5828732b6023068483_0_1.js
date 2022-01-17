function () {
        var proxy = myCodeMirror.getValue();

        localStorage['proxy'] = proxy;

        var pac = hosts2pac(proxy);

        var config = {
            mode: "pac_script",
            pacScript: {
                data: pac
            }
        };
        chrome.proxy.settings.set({
            value: config, 
            scope: 'regular'
        }, function() {});

        alert('OK');
    }