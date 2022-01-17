function(e) {
        var self            = this,
            event           = (e.detail
                                ? e
                                : e.originalEvent),
            dataTransfer    = event.detail;
        if (! dataTransfer) { return; }

        console.log("TopicView::dragDropExternal: dataTransfer: %j",
                    dataTransfer);

        var $tgt    = $(e.target).closest(
                        (! app.dragging ||
                           app.dragging.hasClass('curation-item')
                            ? '.curation-item,.curation-topic'
                            : '.curation-topic'));

        /*
        var $tgtTags   = $tgt.parent().find( '> '+ $tgt.prop('tagName') );

        console.log("TopicView::dragDropExternal: tgt[ %s-%d.%s ]",
                    $tgt.prop('tagName'),
                    $tgtTags.index($tgt),
                    $tgt.attr('class'));
        // */

        var $after  = ($tgt.hasClass('curation-item')
                        ? $tgt
                        : self.$items.children().last()),
            items   = dataTransfer2Items(self.options.model, dataTransfer);

        /*
        console.log("TopicView::dragDropExternal: %d items: %j",
                    items.length, items);
        // */

        // Create new item(s) add them to the item list.
        _.each(items, function(item, itemIndex) {
            /*
            console.log("TopicView::dragDropExternal: item %d: %j",
                        itemIndex, item);
            // */

            var view    = new app.View.ItemView({model:item});
            if ((! $after) || ($after.length < 1))
            {
                // First child
                self.$items.append( view.$el );
            }
            else
            {
                view.$el.insertAfter( $after );
            }

            $after = view.$el;
        });

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