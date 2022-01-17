function() {
var root    = this,
    app     = root.app;

app.View.ItemView   = Backbone.View.extend({
    tagName:    'li',
    className:  'curation-item',

    events:     {
        'render':                   'render',

        'click .control-visit':     'ctrlVisit',
        'click .control-delete':    'ctrlDelete'
    },

    template:   '#curation-item',

    /** @brief  Initialize a new instances.
     */
    initialize: function() {
        var self    = this;

        self.$el.data('view', self);

        if (_.isString( self.template ))
        {
            // Resolve our template
            var html    = $(self.template).html();
            try {
                //app.View.ItemView.prototype.template = _.template( html );
                self.__proto__.template = _.template( html );
            } catch(e) {
                console.log("Template error: %s, html[ %s ]", e.message, html);
            }
        }

        if (self.options.model)
        {
            // Trigger an initial rendering
            self.render();
        }
    },

    /** @brief  Set a new model and trigger a (re)render.
     *  @param  model   An Item model of the form:
     *                      {id:        uid,
     *                       timestamp: timestamp,
     *                       content:   content,
     *                       url:       source-page url,
     *                       location:  inter-page location (id),
     *                       selector:  inter-page selector (starting at id),
     *                       topicId:   id of containing topic,
     *                       order:     sort order,
     *                       comments:  []}
     */
    setModel: function(model) {
        var self    = this;

        console.log("ItemView::setModel(): id[ %s ]", model.id);

        self.options.model = model;

        self.render();

        return self;
    },

    /** @brief  Render this item.
     */
    render: function() {
        var self    = this,
            item    = self.options.model;
        if (! item) { return; }

        self.$el.attr('draggable', true);
        self.$el.html( self.template(item) );

        self.$controls = self.$el.find('.curation-controls');

        return self;
    },

    /************************************************************************
     * Event handlers
     *
     */
    ctrlVisit: function(e) {
        var self    = this;

        console.log("ItemView::ctrlVisit(): item[ %s ]",
                    JSON.stringify(self.options.model));

        e.preventDefault();
        e.stopPropagation();

        // Request a visit to the target href.
        addon.postMessage({
            src:        'sidebar-content',
            action:     'visit',
            url:        self.options.model['url'],
            location:   self.options.model['location'],
            selector:   '',
            current:    (! e.metaKey)
        });
    },
    ctrlDelete: function(e) {
        var self    = this,
            $button = $(e.target),
            pos     = $button.position();

        // Present a confirmation mini-dialog
        var confirm = new app.View.MiniDialog({
                        question:   'Delete this item?',
                        css:        {
                            'z-index':  10,
                            'top':      pos.top,
                            'left':     0
                        },
                        confirmed:  function() {
                            console.log("ItemView::Delete (%s)",
                                        self.options.model.id);
                            self.$el.hide('fast', function() {
                                self.remove();
                            });
                        }
                      });

        self.$el.append( confirm.$el );
    },
});

}