function dataTransfer2Items(topic, dataTransfer)
{
    /* Type-based Heuristic:
     *  - one or more 'files'
     *      dropping an external/system file
     *          generate a URL to the target file and, if the dataTransfer item
     *          includes a 'dataUrl' item, include an img using the dataUrl as
     *          the source;
     *  - 'text/x-moz-url' but no 'text/_moz_htmlcontext'
     *      dropping a URL from the address bar
     *          use 'text/x-moz-url', splitting the URL from the title
     *  - 'text/x-moz-place'
     *      dropping a bookmark entry {title, uri}
     *          use 'text/html'
     *  - 'text/html'
     *      dropping pre-formated HTML
     *          if the data is an object with an 'html' member, assume sbDrop()
     *          has converted it to an item of the form:
     *              {html:, srcUrl}
     *          otherwise, use it directly as raw html;
     *  - 'text/plain'
     *      dropping plain-text -- ignore??;
     */
    var items   = [],
        hasType = function(val) {
            return (dataTransfer.types.indexOf(val) >= 0);
        };

    if (dataTransfer.files && (dataTransfer.files.length > 0))
    {
        // Create an entry for each file

        /*
        console.log("dataTransfer2Items:   %d: file entries:",
            dataTransfer.files.length);
        // */

        _.each(dataTransfer.files, function(file, idex) {
            //console.log("dataTransfer2Items:    %d: %j", idex, file);

            /* If this item has a 'dataUrl', use it in an enclosed <img>
             * element to provide a file-independent view of the file contents
             * that were in place when the file was dropped.
             */
            var url     = 'file://'+ file.path,
                content = '<a href="'+ url +'">'
                        +   (file.dataUrl
                                ? '<img src="'+ file.dataUrl +'" />'
                                : file.name)
                        + '</a>';

            items.push({
                timestamp:  (new Date()).getTime(),
                content:    content,
                url:        url,
                location:   '',
                selector:   '',
                topicId:    topic.id,
                order:      '',
                comments:   []
            });
        });
    }
    else if (hasType('text/x-moz-place'))
    {
        // Bookmark entry {title, url} (could also use 'text/html')
        var data        = dataTransfer['text/x-moz-place'],
            fullUrl     = data.uri,
            url         = fullUrl,
            title       = data.title,
            hashStart   = url.lastIndexOf('#'),
            hashEnd     = url.indexOf(' ', start),
            location    = (hashEnd > hashStart
                            ? url.substring(hashStart, hashEnd)
                            : (hashStart >= 0
                                ? url.substr(hashStart)
                                : ''));
        if (hashStart > 0)
        {
            url = url.substr(0, hashStart);
        }

        /*
        console.log("dataTransfer2Items:   text/x-moz-place: data[ %j ]",
                    data);
        // */

        items.push({
            timestamp:  (new Date()).getTime(),
            content:    '<a href="'+ fullUrl +'">'+ title +'</a>',
            url:        url,
            location:   location,
            selector:   '',
            topicId:    topic.id,
            order:      '',
            comments:   []
        });
    }
    else if ( hasType('text/x-moz-url') &&
              (! hasType('text/_moz_htmlcontext')) )
    {
        /* URL from address bar
         *  use 'text/x-moz-url', splitting the URL from the title
         */
        var data        = dataTransfer['text/x-moz-url'];

        /*
        console.log("dataTransfer2Items:   %d: text-x-moz-urls "
                    +   "without _moz_htmlcontext",
                    data.length);
        // */

        _.each(data, function(entry, idex) {
            //console.log("dataTransfer2Items:      %d: %j", idex, entry);

            items.push({
                timestamp:  (new Date()).getTime(),
                content:    '<a href="'+ entry.url +'">'+ entry.title +'</a>',
                url:        entry.url,
                location:   location,
                selector:   '',
                topicId:    topic.id,
                order:      '',
                comments:   []
            });
        });
    }
    else if (hasType('text/html'))
    {
        // Use the dropped HTML (or sbDrop() constructed item).
        var item        = dataTransfer['text/html'],
            html        = (item && item.html
                            ? item.html
                            : item),
            $html       = $('<div>'+ html +'</div>'),
            fullUrl     = (item && item.srcUrl
                            ? item.srcUrl
                            : 'url://of.source/page'),
            url         = fullUrl,
            location    = '';

        /*
        console.log("dataTransfer2Items:   text/html: item[ %s ]",
                    JSON.stringify(item));
        // */

        var $id = $html.find('[id]').first();
        if ($id && ($id.length > 0))
        {
            /* Use the id of the *last* element in the incoming HTML that has
             * an id
             */
            location = '#'+ $id.attr('id');
        }
        else if ( hasType('text/_moz_htmlcontext'))
        {
            // Use _moz_htmlcontext to construct a location
            var context     = dataTransfer['text/_moz_htmlcontext'],
                $context    = $(context),
                $inner      = $context.find(':not(:has(*))').last(),
                path        = [];

            /* Use the id of the *nearest* element in our context that has an
             * id
             */
            $id = $inner.closest('[id]');
            if ($id && ($id.length > 0))
            {
                location = '#'+ $id.attr('id');
            }
        }

        /* Remove any in-line styling and event handlers from the incoming HTML
         * elements
         */
        $html.find('*').each(function() {
            var el  = this,
                $el = $(el);

            /* Walk through the properties and remove any in-line styling and
             * event handlers
             */
            var toRemove    = [];
            for (var prop in el)
            {
                if ((! $el.attr(prop)) && (! $el.prop(prop)))   { continue; }

                if (prop.match(/^(style$|on|height|width)/i))
                {
                    toRemove.push(prop);
                }
            }

            toRemove.forEach(function(name) {
                $el.removeProp(name);
                $el.removeAttr(name);
            });
        });

        if (location.length > 0)
        {
            // Remove any '#' from the url
            var hashStart   = url.lastIndexOf('#');
            if (hashStart > 0)
            {
                url = url.substr(0, hashStart);
            }
        }

        /*
        console.log("dataTransfer2Items:   text/html: html[ %s ]", html);
        console.log("dataTransfer2Items:   text/html: $html[ %s ]",
                        $html.html());
        // */

        var item    = {
            timestamp:  (new Date()).getTime(),
            content:    $html.html().trim(),
            url:        url,
            location:   location,
            selector:   '',
            topicId:    topic.id,
            order:      '',
            comments:   []
        };

        // /*
        console.log("dataTransfer2Items:   text/html: item[ %s ]",
                    JSON.stringify(item));
        // */

        items.push( item );
    }
    // else, IGNORE (by NOT adding anyting to items)

    /* 'x-moz-file' ends up having *less* information than simple File (no
     * 'type' and no possibility of 'dataUrl'), so we ignore it here ...
     *
    if (hasType('application/x-moz-file'))
    {
        var data    = dataTransfer['application/x-moz-file'];

        // Create an entry for each file
        console.log("dataTransfer2Items:   %d: application/x-moz-file entries:",
                    data.length);

        _.each(data, function(file, idex) {
            console.log("dataTransfer2Items:    %d: %j", idex, file);
        });
    }
    else
    // */


    return items;
}