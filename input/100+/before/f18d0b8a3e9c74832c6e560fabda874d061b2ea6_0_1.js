function(list, type) {
        var i,
            data = '',
            url;

        if ('js' === type) {
            for (i = 0; i < list.length; i += 1) {
                // Escape any HTML chars in the URL to avoid trivial attribute
                // injection attacks.
                url = Y.Escape.html(list[i]);
                data += '<script type="text/javascript" src="' +
                    url + '"></script>\n';
            }
        } else if ('css' === type) {
            for (i = 0; i < list.length; i += 1) {
                // Escape any HTML chars in the URL to avoid trivial attribute
                // injection attacks.
                url = Y.Escape.html(list[i]);
                data += '<link rel="stylesheet" type="text/css" href="' +
                    url + '"/>\n';
            }
        } else if ('blob' === type) {
            for (i = 0; i < list.length; i += 1) {
                // NOTE: Giant security hole...but used by everyone who uses
                // Mojito so there's not much we can do except tell authors of
                // Mojito applications to _never_ use user input to generate
                // blob content or populate config data. Whatever goes in here
                // can't be easily encoded without the likelihood of corruption.
                data += list[i] + '\n';
            }
        } else {
            Y.log('Unknown asset type "' + type + '". Skipped.', 'warn', NAME);
        }

        return data;
    }