function() {

        var $this   = $(this),
            name    = $this.attr('name'),
            val     = $this.val(),
            i       = $this.attr('i'),
            removes = [name, 'page' + i, 'limit' + i],
            url, url1, conj;

        url = location.href;
        url1 = url.split('?')[0];

        for (var j = 0; j < removes.length; j++) {
            url = removeParam(removes[j], url);
        }

        conj = (url == url1) ? '?' : '&';
        location.href = url + conj + name + '=' + val;

    }