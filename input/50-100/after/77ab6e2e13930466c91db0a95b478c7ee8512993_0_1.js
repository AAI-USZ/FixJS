function(ev) {
            var modpath = _findMatch(ev).getAttribute('modpath'),
                url     = '/docs/plugins/'+modpath,
                parts   = modpath.split('.'),
                cname   = parts.pop();
            window.open(url, 'Docs for '+modpath);
        }