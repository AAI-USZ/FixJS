function(url) {
        if (url) {
            return url.replace(/(\.png|\.jpg|\.jpeg)(\d*)/, '.grid.json');
        }
    }