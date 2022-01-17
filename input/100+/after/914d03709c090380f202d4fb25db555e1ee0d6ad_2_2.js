function() {
var root    = this,
    app     = root.app;

/** @brief  A simple, modal mini-dialog used for confirmations.
 *
 *  Accepts the following options:
 *      question        HTML of the question to present;
 *      confirm         The confirmation text [ 'yes' ];
 *      cancel          The cancellation text [ 'no' ];
 *
 *      primary         Which answer is primary? 'confirm' | [ 'cancel' ]
 *
 *      css             An object of CSS name/value pairs;
 *
 *      confirmed()     A callback to invoke if confirmed;
 *      cancelled()     A callback to invoke if cancelled;
 *
 *  Triggers events:
 *      'confirmed'
 *      'cancelled'
 */
app.View.MiniDialog  = Backbone.View.extend({
    tagName:    'div',
    className:  'ui-confirmation',

    events: {
        'click button':     'clickButton',
        'render':           'render'
    },

    template:    '<div class="ui-question"><%= question %></div>'
               + '<div class="ui-buttons">'
               +  '<button name="yes"><%= confirm %></button>'
               +  '<button name="no" ><%= cancel %></button>'
               + '</div>',

    /** @brief  Initialize a new instances.
     */
    initialize: function() {
        var self    = this;

        if (_.isString( self.template ))
        {
            // Resolve our template
            var html    = self.template;
            try {
                //app.View.MiniDialog.prototype.template = _.template( html );
                self.__proto__.template = _.template( html );
            } catch(e) {
                console.log("MiniDialog error: %s, html[ %s ]",
                            e.message, html);
            }
        }

        /* Include a document-level key handler to allow keyboard selection
         * when the dialog is visible.
         */
        $(document).on('keydown.miniDialog', _.bind(self.keyPress, self));

        if (self.options.question)
        {
            // We've been given data directly, render immediately.
            self.render();
        }
    },

    /** @brief  Render the given question.
     */
    render: function() {
        var self        = this;
        if (! self.options.question)    { return; }

        var data    = _.extend({confirm:'yes',cancel:'no'}, self.options),
            $body   = $( self.template( data ) );

        self.$confirm = $body.find('button[name=yes]');
        self.$cancel  = $body.find('button[name=no]');

        if (self.options.primary === 'confirm')
        {
            self.$confirm.addClass('ui-priority-primary');
            self.$cancel.addClass( 'ui-priority-secondary');
        }
        else
        {
            self.$confirm.addClass('ui-priority-secondary');
            self.$cancel.addClass( 'ui-priority-primary');
        }

        self.$el.append( $body );

        if (self.options.css)   { self.$el.css( self.options.css ); }

        return self;
    },

    /** @brief  Remove this view from the DOM.
     */
    remove: function() {
        var self    = this;

        // Remove our document-level key handler
        $(document).off('.miniDialog');

        self.$el.hide('fast', function() {
            self.$el.remove();
        });
        return self;
    },

    /************************************************************************
     * Event handlers
     *
     */
    keyPress: function(e) {
        var self    = this;
        if (! self.$el.is(':visible'))  { return; }

        switch (e.which)
        {
        case 13:    // ENTER
            if (self.options.primary === 'confirm')
            {
                self.$confirm.click();
                return;
            }
            // fall through

        case 27:    // ESC
            self.$cancel.click();
            break;
        }
    },

    clickButton: function(e) {
        var self    = this,
            $button = $(e.target);

        switch ($button.attr('name'))
        {
        case 'yes':
            if (_.isFunction(self.options.confirmed))
            {
                self.options.confirmed();
            }
            self.$el.trigger('confirmed');
            break;

        case 'no':
            if (_.isFunction(self.options.cancelled))
            {
                self.options.cancelled();
            }
            self.$el.trigger('canceled');
            break;
        }

        // And, remove ourselves
        self.remove();
    }
});

}