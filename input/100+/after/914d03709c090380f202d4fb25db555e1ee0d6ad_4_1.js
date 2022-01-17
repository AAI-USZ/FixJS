function(e) {
        var self    = this;

        //console.log("TopicsView::dragDrop:");

        /* Create a new proxied event containing the incoming 'detail'
         * (dataTransfer) data and trigger that event on the first
         * '.curation-topic'.
         */
        var proxied     = $.Event('dropExternal', {
                                    detail: e.originalEvent.detail
                                  }),
            $topic      = self.$el.find('.curation-topic:first');

        //console.log("TopicsView::dragDrop: topic[ %s ]", $topic);
        if ($topic.length < 1)
        {
            /* There are NO topics currently defined.
             *
             * Create and add a new one, and use IT as the target.
             */
            var view    = self.addTopic({
                            title:  'New Topic',
                            items:  []
                          });
            $topic = view.$el;
        }

        //console.log("TopicsView::dragDrop: topic2[ %s ]", $topic);
        $topic.trigger( proxied );
    }