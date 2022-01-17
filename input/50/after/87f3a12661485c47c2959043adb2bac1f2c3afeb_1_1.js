function(url) {
            url =  url.replace(/jamendo\.com\/(?:\w\w\/)?(album|list|track)\/([^\/]+)(\/.*)?$/, "jamendo.com/$1/$2");
            url =  url.replace(/img\.jamendo\.com\/albums\/(\d+)\/covers\/\d+\.\d+\.jpg/, "www.jamendo.com/album/$1/");
            url =  url.replace(/jamendo\.com\/\w\w\/artist\//, "jamendo.com/artist/");
            return url;
        }