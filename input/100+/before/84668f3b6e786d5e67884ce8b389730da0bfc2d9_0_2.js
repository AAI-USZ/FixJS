function () {

        // Old-skool base tag
        var base = $('base');
        if( base.length > 0 ) {
            scraper.base = rtrim($('base').first().attr('href'), '/') + '/';
        }
        
        // All images
        var images = $('img'), filtered = [], srcs = {};

        // Grab the open graph image
        var ogimage = $('meta[property="og:image"]');
        var ogtmp;
        if( ogimage.length > 0 ) {
            ogtmp = $('<img>').prop({
                'src': $(ogimage).text(),
                'class': 'opengraph',
                'width': 1000, // High priority
                'height': 1000
            });
            images.push(ogtmp);
        }

        // Cycle through all images
        var i = 0, l=images.length, result, img;
        for(; i < l; i++) {

            scraper.scanned += 1;

            img = images[i];

            // Have we seen this image already?
            if( !! srcs[$(img).attr('src')] ) {
                // Yep, skip it
                continue;
            } else {
                // Nope, remember it
                srcs[$(img).attr('src')] = true;
            }

            result = filterImage(img);

            if( result !== false ) {
                filtered.push(result);
            }

        }

        var pow = Math.pow;
        filtered.sort(function (a, b) {
            return pow(pow(b.width, 2) + pow(b.height, 2), 1/2) - pow(pow(a.width, 2) + pow(a.height, 2), 1/2);
        });

        return filtered.slice(0, config.need);

    }