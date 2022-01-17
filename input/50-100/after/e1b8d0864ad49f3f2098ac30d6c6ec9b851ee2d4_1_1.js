function(match, url) {
            if (url.indexOf("|") !== -1) {
                var parts = url.split("|");
                return '['+parts[1]+']('+parts[0]+')';
            } else {
                var text = url;
                url = url.replace(/ /g, "_");
                return '['+text+']('+url+')';
            }
        }