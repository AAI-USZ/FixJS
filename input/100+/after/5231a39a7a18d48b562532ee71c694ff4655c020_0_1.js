function(term) {
            // Filter out http:// as it causes the search feed to break
            term = term.replace(/http:\/\//ig, '');
            // taken this from search_main until a backend service can get related content
            var urlterm = '';
            var split = $.trim(term).split(/\s/);
            if (split.length > 1) {
                for (var i = 0; i < split.length; i++) {
                    if (split[i]) {
                        urlterm += split[i] + ' ';
                        if (i < split.length - 1) {
                            urlterm += 'OR ';
                        }
                    }
                }
            }
            else {
                urlterm = split[0];
                if (urlterm === '') {
                    urlterm = '*';
                }
            }
            return urlterm;
        }