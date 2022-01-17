function(url) {
            url =  url.replace(/jamendo\.com\/(?:\w\w\/)?(album|list)\/([^\/]+)(\/.*)?$/, "jamendo.com/$1/$2");
            url =  url.replace(/img\.jamendo\.com\/albums\/(\d+)\/covers\/\d+\.\d+\.jpg/, "www.jamendo.com/album/$1/");
            return url.replace(/jamendo\.com\/\w\w\/artist\//, "jamendo.com/artist/");
        }