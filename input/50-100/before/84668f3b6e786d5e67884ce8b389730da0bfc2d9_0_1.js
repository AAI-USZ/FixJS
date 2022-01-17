function (src) {

        // add protocol to relative urls
        if( src.substring(0, 2) === "//" ) {
            src = document.location.protocol + src;
        }

        // prepend site if missing
        if( ! src.match(/^https?:\/\//g) ) {

            // relative to site root
            if( src.substring(0,1) === "/" ) {
                src = scraper.base + src;
            }
            // no slash, relative to url
            else {
                src = scraper.url + '/' + src;
            }

        }

        return src;

    }