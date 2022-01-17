function() {
var root    = this,
    app     = root.app;

app.View.TopicsView = Backbone.View.extend({
    events:     {
        'keydown input.new-topic':      'topicAddKey',

        'click a':                      'openInTab',

        'render':                       'render',

        // Drag-and-drop
        'dragstart li':                 'dragStart',
        'dragend   li':                 'dragEnd'
    },

    /** @brief  Initialize a new instances.
     */
    initialize: function() {
        var self    = this;

        self.$el.data('view', self);

        /* Add a document-level 'dragover' handler to allow dropping at any
         * location within the sidebar
         */
        $(document).on('dragover', _.bind(self.dragOver, self));

        /* Add a document-level 'drop' handler to take care of 'drop' events
         * that have been proxied to the sidebar document via
         * sbDndProxy()/sbDrop() in the sidebar addon as 'dropExternal' events
         * -- most likely because an item was dropped on the splitter while the
         * sidebar was closed.
         */
        $(document).on('dropExternal', _.bind(self.dragDrop, self));

        // Cache element references
        self.$topicInput = self.$el.find('.new-topic');
        self.$topics     = self.$el.find('.curation-topics');

        // Listen for 'message' events from the addon.
        addon.on('message', self.addonMessage.bind(self));

        if (self.options.model)
        {
            // We've been given data directly, render immediately.
            self.render();
        }
        else
        {
            /* We've not been given any data to render.
             *
             * Notify the addon that we're ready and wait for data to render.
             */
            addon.postMessage({
                src:    'sidebar-content',
                action: 'loaded',
                url:    'js/topics-sidebar.js'
            });
        }
    },

    /** @brief  Handle an incoming message from the addon.
     *  @param  msg     The message data:
     *                      {action: *action*, action-secific-data}
     *                          Valid actions:
     *                              'load',         topics:[]
     *                              'currentUrl',   url:'...'
     */
    addonMessage: function(msg) {
        var self    = this;

        switch (msg.action)
        {
        case 'load':
            console.log("TopicsView:addonMessage(): "
                        +   "'setModel' from[ %s ], %d topics",
                        msg.src, msg.topics.length);

            self.setModel( msg.topics );
            break;

        case 'currentUrl':
            console.log("TopicsView:addonMessage(): "
                        +   "'currentUrl' from[ %s ], url[ %s ]",
                        msg.src, msg.url);

            self.currentUrl( msg.url );
            break;

        default:
            console.log("TopicsView:addonMessage(): unhandled message %j",
                        msg);
            break;
        }
    },

    /** @brief  Set a new model and trigger a (re)render.
     *  @param  model   An array of Topic records, each of the form:
     *                      {title: topic,
     *                       items: []}
     */
    setModel: function(model) {
        var self    = this;

        self.options.model = model;

        self.render();

        return self;
    },

    /** @brief  Used by main to communicate the URL of the currently active
     *          tab.
     *  @param  url     The url;
     */
    currentUrl: function(url) {
        var self    = this;

        //console.log("TopicsView::currentUrl(): url[ %s ]", url);

        self._currentUrl = url;

        return self;
    },

    /** @brief  Render the given set of topics.
     */
    render: function() {
        var self    = this,
            topics  = self.options.model;
        if (! topics)   { return; }

        console.log("TopicsView::render(): %d topics", topics.length);

        self.$topics.empty();
        topics.forEach(function(topic) {
            var view    = new app.View.TopicView({model: topic});

            self.$topics.append( view.$el );
        });

        return self;
    },

    /** @brief  Add a new topic.
     *  @param  topic   The topic model.
     *
     *  @return The new TopicView
     */
    addTopic: function(topic) {
        var self    = this;
            view    = new app.View.TopicView({model: topic});

        self.$topics.append( view.$el );

        return view;
    },

    /************************************************************************
     * Event handlers
     *
     */
    topicAddKey: function(e) {
        var self    = this,
            val     = self.$topicInput.val();

        switch (e.which)
        {
        case 13:    // ENTER
            if (val.length > 0)
            {
                // Add a new topic
                self.addTopic({
                    title:  val,
                    items:  []
                });

                self.$topicInput.val('');
                self.$topicInput.blur();

                e.preventDefault();
                e.stopPropagation();
            }
            break;

        case 27:    // ESC
            self.$topicInput.val('');
            self.$topicInput.blur();
            break;
        }

    },

    openInTab: function(e) {
        var self    = this,
            $a      = $(e.target);

        e.preventDefault();
        e.stopPropagation();

        console.log("TopicsView::openInTab(): "
                    +   "%s, %sshift, %sctrl, %salt, %smeta",
                $a.attr('href'),
                (e.shiftKey ? ' ' : '!'),
                (e.altKey   ? ' ' : '!'),
                (e.ctrlKey  ? ' ' : '!'),
                (e.metaKey  ? ' ' : '!'));

        // Request a visit to the target href.
        addon.postMessage({
            src:    'sidebar-content',
            action: 'visit',
            url:    $a.attr('href'),
            current:(! e.metaKey)
        });
    },

    /**********************
     * Drag-and-drop
     *
     */
    dragStart: function(e) {
        var self            = this,
            dataTransfer    = (e.dataTransfer
                                ? e.dataTransfer
                                : e.originalEvent.dataTransfer);

        if (! dataTransfer) { return; }

        var $src    = $(e.target);
        if (! $src.attr('draggable'))
        {
            // Immediate propagate up to the top-level 'draggable'
            $src = $src.parents('[draggable]:first');
        }

        /*
        var $tags   = $src.parent().find( $src.prop('tagName') );
        console.log("drag start: src[ %s-%d.%s ]",
                    $src.prop('tagName'),
                    $tags.index($src),
                    $src.attr('class'));
        // */

        $src.addClass('dragging');
        app.dragging  = $src;

        //dataTransfer.effectAllowed = 'move';
        dataTransfer.setData('text/html', $src.html());
        dataTransfer.setData('application/x-moz-node', $src[0]);
    },
    dragEnd: function(e) {
        var self    = this,
            $src    = (app.dragging ? app.dragging : $(e.target));

        /*
        var $tags   = $src.parent().find( $src.prop('tagName') );
        console.log("drag end: src[ %s-%d.%s ]",
                    $src.prop('tagName'),
                    $tags.index($src),
                    $src.attr('class'));
        // */

        $src.removeClass('dragging');

        app.dragging  = null;

        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
    },

    // Document-level drag-and-drop handlers
    dragOver: function(e) {
        var self            = this,
            dataTransfer    = (e.dataTransfer
                                ? e.dataTransfer
                                : e.originalEvent.dataTransfer);

        dataTransfer.dropEffect = (app.dragging ? 'move' : 'copy');
        e.preventDefault();
    },

    dragDrop: function(e) {
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
});

}