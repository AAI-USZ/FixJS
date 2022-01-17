function getRequest() {
        var main = document.id('main');
        var options = {
            url: document.id('url').value,
            emulation: false,
            noCache: true,
            onSuccess: function(res) {
                try {
                    var data = JSON.parse(res);
                    main.empty();
                    var el = recJSON(data);
                    el.inject(main);
                    
                }
                catch (e) {
                    main.set('html', res);
                }
            },
            onFailure: function(res) {
                main.set('html', "<pre>" + res.responseText + "</pre>");
            },
            onException: function(res) {
                main.set('html', "<pre>" + res.responseText + "</pre>");
            }
        }
        var data = {};
        $$('.data-row').each(function(row) {
            var key = row.firstChild.value;
            var val = row.lastChild.value;
            if (key !== '') {
                data[key] = val;
            }
        })
        return [new Request(options), data];
    }