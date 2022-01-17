function(ev) {
            var modpath = _findMatch(ev).getAttribute('modpath');
            var url = '/docs/plugins/'+modpath;
            var parts = modpath.split('.');
            var cname = parts.pop();
            window.open(url, 'Docs for '+modpath);
        }