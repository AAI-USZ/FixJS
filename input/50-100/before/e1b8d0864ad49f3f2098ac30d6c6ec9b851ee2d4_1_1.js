function(match, url) {
            var text = url.replace(/#/g, "");
            url = url.replace(/ /g, "_");
            return '['+text+']('+url+')'
        }