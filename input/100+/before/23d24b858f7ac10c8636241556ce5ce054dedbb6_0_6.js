function(e) {
        var self            = this,
            dataTransfer    = (e.dataTransfer
                                ? e.dataTransfer
                                : e.originalEvent.dataTransfer);
        if (! dataTransfer) { return; }

        if (! self.canDrop( gDragging ))    { return; }

        var $src    = (gDragging || $(dataTransfer.mozSourceNode));
        if (! $src) { return; }

        // /*
        var $srcTags   = $src.parent().find( '> '+ $src.prop('tagName') );
        console.log("TopicView::dragDrop: src[ %s-%d.%s ]",
                    $src.prop('tagName'),
                    $srcTags.index($src),
                    $src.attr('class'));
        // */

        var $tgt    = $(e.target).closest(
                        (! gDragging || gDragging.hasClass('curation-item')
                            ? '.curation-item,.curation-topic'
                            : '.curation-topic'));
        if (! gDragging)
        {
            /* Dropping an "External" item.
             *
             * Type-based Heuristic:
             *  - 'application/x-moz-file' (or dataTransfer.files.length > 0)
             *      dropping an external file from the system
             *          use dataTransfer.files
             *              {size, type, name, mozFullPath}
             *  - 'text/x-moz-url' but no 'text/_moz_htmlcontext'
             *      dropping a URL from the address bar
             *          use 'text/x-moz-url', splitting the URL from the title
             *  - 'text/x-moz-place'
             *      dropping a bookmark entry {title, uri}
             *          use 'text/html'
             *  - 'text/html'
             *      dropping pre-formated HTML -- use it directly;
             *  - 'text/plain'
             *      dropping plain-text -- ignore??;
             */
            console.log("TopicView::dragDrop: dataTransfer types:");
            _.each(dataTransfer.types, function(type) {
                console.log("TopicView::dragDrop:   %s: %s",
                            type, dataTransfer.getData(type));
            });

            var types   = [].slice.call(dataTransfer.types, 0),
                items   = [];
            if (dataTransfer.files && (dataTransfer.files.length > 0))
            {
                // Create an entry for each file
                _.each(dataTransfer.files, function(file) {
                    var url         = 'file://'+ file.mozFullPath,
                        title       = file.name,
                        selector    = '';

                    items.push({
                        timestamp:  (new Date()).getTime(),
                        content:    '<a href="'+ url +'">'+ title +'</a>',
                        url:        url,
                        selector:   selector,
                        topicId:    self.options.model.id,
                        order:      '',
                        comments:   []
                    });
                });
            }
            else if (types.indexOf('text/x-moz-place') >= 0)
            {
                // Bookmark entry {title, url} (could also use 'text/html')
                var data        = JSON.parse(
                                    dataTransfer.getData('text/x-moz-place')),
                    url         = data.uri,
                    title       = data.title,
                    selector    = '';

                items.push({
                    timestamp:  (new Date()).getTime(),
                    content:    '<a href="'+ url +'">'+ title +'</a>',
                    url:        url,
                    selector:   selector,
                    topicId:    self.options.model.id,
                    order:      '',
                    comments:   []
                });
            }
            else if ((types.indexOf('text/x-moz-url') >= 0) &&
                     (types.indexOf('text/_moz_htmlcontext') < 0))
            {
                /* URL from address bar
                 *  use 'text/x-moz-url', splitting the URL from the title
                 */
                var data        = dataTransfer.getData('text/x-moz-url'),
                    parts       = data.split("\n");

                for (var idex = 0, len = parts.length; idex < len; idex += 2)
                {
                    var url         = parts[idex],
                        title       = parts[idex+1],
                        selector    = '';

                    items.push({
                        timestamp:  (new Date()).getTime(),
                        content:    '<a href="'+ url +'">'+ title +'</a>',
                        url:        url,
                        selector:   selector,
                        topicId:    self.options.model.id,
                        order:      '',
                        comments:   []
                    });
                }
            }
            else if (types.indexOf('text/html') >= 0)
            {
                /* Use the dropped HTML
                 *
                 *  :TODO: Grab the page URL (via tabs)
                 *         and generate the page selector.
                 */
                var data        = dataTransfer.getData('text/html'),
                    url         = 'url://of.source/page',
                    selector    = '#content > .selector';

                items.push({
                    timestamp:  (new Date()).getTime(),
                    content:    data,
                    url:        url,
                    selector:   selector,
                    topicId:    self.options.model.id,
                    order:      '',
                    comments:   []
                });
            }
            // else, IGNORE (by NOT adding anyting to items)

            // Create new item(s) add them to the item list.
            var $after  = ($tgt.hasClass('curation-item')
                            ? $tgt
                            : self.$items.children().last());
            _.each(items, function(item) {
                var view    = new ItemView({model:item});
                view.$el.insertAfter( $after );

                $after = view.$el;
            });
        }
        else if ($tgt.get(0) !== $src.get(0))
        {
            if ($tgt.hasClass('curation-item') ||
                $src.hasClass('curation-topic'))
            {
                $src.insertAfter( $tgt );
            }
            else
            {
                self.$items.append( $src );
            }
        }

        /* Directly remove the 'drag-over' class on $tgt since 'dragleave' will
         * NOT be triggerd on the target element.
         */
        $('.drag-over').removeClass('drag-over')
                       .removeData('drag-count');

        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
    }