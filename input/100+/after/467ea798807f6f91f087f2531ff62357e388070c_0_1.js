function(e, data, tags, options) {
        if (!data) {
            return false;
        }
        var html = '';
        var row = 'odd';
        var desc = data.title;

        // Add header if required
        if (options.header) {
            desc = data.description;

            html += '<div class="flickrHeader">' +
                '<a href="'+ data.link +'" title="'+ desc +'">'+ data.title +'</a>' +
                '</div>';
        }

        // Add body
        html += '<div class="flickrBody">' + '<ul>';

        var feeds = data.items;
        var count = feeds.length;
        if (count > options.limit) count = options.limit;

        // Pseudo randomize array
        if (options.randomize) {
            feeds = feeds.sort(function() { return 0.5 - Math.random();});
        }

        // Add feeds
        for (var i=0; i<count; i++) {

            // Get individual feed
            var photo= feeds[i];
            var link = '<a target="_blank" href=http://www.flickr.com/search/?w=all&q=' + tags + '&m=text">';

            // Add feed row
            html += '<li class="flickrRow '+ row +'">';

            // Select image size
            var src = photo.media.m;
            if (options.imagesize == 'square') src = src.replace('_m', '_s');
            if (options.imagesize == 'thumbnail') src = src.replace('_m', '_t');
            if (options.imagesize == 'medium') src = src.replace('_m', '');

            html += link +'<img src="'+ src +'"></a>';

            // Add title if required
            if (options.title) html += '<'+ options.titletag +'>'+ photo.title +'</'+ options.titletag +'>';

            // Add date if required
            if (options.date) {
                var photoDate = new Date(photo.date_taken);
                photoDate = photoDate.toLocaleDateString() + ' ' + photoDate.toLocaleTimeString();
                html += '<div>'+ photoDate +'</div>';
            }

            html += '</li>';

            // Alternate row classes
            if (row == 'odd') {
                row = 'even';
            } else {
                row = 'odd';
            }
        }

        html += '</ul>' + '</div>';

        $(e).html(html);
        $(e).trigger('loaded');
    }