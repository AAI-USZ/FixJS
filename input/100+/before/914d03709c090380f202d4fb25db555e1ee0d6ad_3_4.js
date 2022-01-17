function() {
var root    = this,
    app     = root.app;

app.view.TopicView  = Backbone.View.extend({
    tagName:    'li',
    className:  'curation-topic',

    events:     {
        'click .toggle':                'toggle',
        'click header > h1':            'toggle',

        'render':                       'render',

        'click header .control-edit':       'ctrlEdit',
        'click header .control-delete':     'ctrlDelete',
        'click header .control-move-top':   'ctrlMoveTop',

        'blur header > h1 input':           'editComplete',
        'keydown header > h1 input':        'editKey',

        // Drag-and-drop
        'dragover':                     'dragOver',
        'dragenter':                    'dragEnter',
        'dragleave':                    'dragLeave',

        'drop':                         'dragDrop',

        'dropExternal':                 'dragDropExternal'
    },

    template:   '#curation-topic',

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
                //app.view.TopicView.prototype.template = _.template( html );
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
     *  @param  model   A Topic model of the form:
     *                      {id:    uid,
     *                       title: topic,
     *                       order: sort-order,
     *                       items: []}
     */
    setModel: function(model) {
        var self    = this;

        console.log("TopicView::setModel(): topic[ %s ], %d items",
                model.title, model.items.length);

        self.options.model = model;

        self.render();

        return self;
    },

    /** @brief  Render this topic.
     */
    render: function() {
        var self    = this,
            topic   = self.options.model;
        if (! topic)    { return; }

        var $topic  = $( self.template(topic) );

        self.$el.attr('draggable', true);
        self.$el.empty();
        self.$el.append( $topic );

        self.$header     = self.$el.find('> header');
        self.$title      = self.$header.find('h1');
        self.$titleSpan  = self.$title.find('span');
        self.$titleInput = self.$title.find('input');
        self.$titleInput.parent().hide();

        self.$toggle     = self.$header.find('.toggle');
        self.$controls   = self.$header.find('.curation-controls');
        self.$items      = self.$el.find('> .curation-items');

        self.$items.empty();

        /* Create each page and item individually so we can attach data to
         * each.
         */
        topic.items.forEach(function(item) {
            var view    = new app.view.ItemView({model: item});
            
            self.$items.append( view.$el );
        });

        return self;
    },

    /************************************************************************
     * Event handlers
     *
     */

    /** @brief  Toggle this topic opened/closed.
     */
    toggle: function(e) {
        var self    = this;

        if (_.isEmpty(self.$toggle) ||
            (self.$titleInput && (self.$titleInput.get(0) == e.target)))
        {
            //console.log("TopicView::toggle(): IGNORE");
            return;
        }

        //console.log("TopicView::toggle()");

        var title   = self.$toggle.attr('title');

        if (e)
        {
            e.preventDefault();
            e.stopPropagation();
        }

        if (self.$el.hasClass('collapsed'))
        {
            self.$el.removeClass('collapsed');
            self.$items.slideDown(function() {
                self.$toggle.attr('title', title.replace('expand', 'collapse'));
            });
        }
        else
        {
            self.$items.slideUp(function() {
                self.$el.addClass('collapsed');
                self.$toggle.attr('title', title.replace('collapse', 'expand'));
            });
        }

        return self;
    },

    /**********************
     * Control handlers
     */
    ctrlEdit: function(e) {
        var self    = this;

        // NOT draggable while editing
        self.$el.attr('draggable', false);

        self.$titleInput.val( self.$titleSpan.text() );
        self.$titleSpan.hide();
        self.$titleInput.parent().show();
        self.$titleInput.focus();
    },
    ctrlDelete: function(e) {
        var self    = this,
            $button = $(e.target),
            pos     = $button.position();

        // Present a confirmation mini-dialog
        var confirm = new app.view.MiniDialog({
                        question:   'Delete this topic<br />and all items?',
                        css:        {
                            'z-index':  self.$controls.css('z-index') + 1,
                            'width':    self.$controls.width(),
                            'top':      pos.top,
                            'right':    0
                        },
                        confirmed:  function() {
                            console.log("TopicView::Delete (%s)",
                                        self.options.model.title);
                            self.$el.hide('fast', function() {
                                self.remove();
                            });
                        }
                      });

        self.$header.append( confirm.$el );
    },
    ctrlMoveTop: function(e) {
        var self    = this,
            $top    = self.$el.siblings().first();

        self.$el.insertBefore($top);
    },

    editKey: function(e) {
        var self    = this;

        //console.log("TopicView::editKey(): %s", e.which);
        switch (e.which)
        {
        case 13:    // ENTER
            self.$titleInput.blur();
            break;

        case 27:    // ESC
            self.$titleInput.val( self.$titleSpan.text() );
            self.$titleInput.blur();
            break;
        }
    },
    editComplete: function(e) {
        var self    = this;

        self.$titleSpan.text( self.$titleInput.val() );
        self.$titleInput.parent().hide();
        self.$titleSpan.show();

        // draggable again
        self.$el.attr('draggable', true);
    },

    /**********************
     * Drag-and-drop
     *  .curation-item
     *  or "external" item
     *
     */
    canDrop: function($src) {
        return ((! $src) || $src.hasClass('curation-item')
                         || $src.hasClass('curation-topic'));
    },
    dragOver: function(e) {
        var self            = this,
            dataTransfer    = (e.dataTransfer
                                ? e.dataTransfer
                                : e.originalEvent.dataTransfer),
            $src            = app.dragging,
            canDrop         = (dataTransfer && self.canDrop($src));

        //console.log("TopicView::dragOver()");

        if (! canDrop)  { return; }

        dataTransfer.dropEffect = (app.dragging ? 'move' : 'copy');
        e.preventDefault();
    },
    dragEnter: function(e) {
        var self        = this,
            $src        = app.dragging,
            $tgt        = $(e.target).closest(
                            (! $src || $src.hasClass('curation-item')
                                ? '.curation-item,.curation-topic'
                                : '.curation-topic')),
            dragCount   = ($tgt.data('drag-count') || 0) + 1;

        if ($src)
        {
            if (! self.canDrop($src))
            {
                // Propagate this event up to our parent
                return;
            }

            /*
            var $srcTags   = $src.parent().find( '> '+ $src.prop('tagName') );
            console.log("TopicView::dragEnter: src[ %s-%d.%s ]: %d",
                        $src.prop('tagName'),
                        $srcTags.index($src),
                        $src.attr('class'),
                        dragCount);
            // */
        }
        /*
        else
        {
            console.log("TopicView::dragEnter: EXTERNAL item: %s.%s: %d",
                        $tgt.prop('tagName'), $tgt.attr('class'), dragCount);
        }
        // */

        $('.drag-over').removeClass('drag-over')
                       .removeData('drag-count');
        $tgt.addClass('drag-over');
        $tgt.data('drag-count', dragCount);

        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
    },
    dragLeave: function(e) {
        var self        = this,
            $src        = app.dragging,
            $tgt        = $(e.target).closest(
                            (! $src || $src.hasClass('curation-item')
                                ? '.curation-item,.curation-topic'
                                : '.curation-topic')),
            dragCount   = ($tgt.data('drag-count') || 1) - 1;

        if (dragCount < 1)
        {
            /*
            if ($src)
            {
                var $srcTags   = $src.parent()
                                        .find( '> '+ $src.prop('tagName') );
                console.log("TopicView::dragLeave: src[ %s-%d.%s ]: %d",
                            $src.prop('tagName'),
                            $srcTags.index($src),
                            $src.attr('class'),
                            dragCount);
            }
            // */

            $tgt.removeClass('drag-over')
                .removeData('drag-count');
        }

        $tgt.data('drag-count', (dragCount > 0 ? dragCount : 0));

        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
    },

    dragDrop: function(e) {
        var self            = this,
            dataTransfer    = (e.dataTransfer
                                ? e.dataTransfer
                                : e.originalEvent.dataTransfer);
        if (! dataTransfer) { return; }

        if (! self.canDrop( app.dragging ))    { return; }

        var $src    = (app.dragging || $(dataTransfer.mozSourceNode));
        if (! $src) { return; }

        var $tgt    = $(e.target).closest(
                        (! app.dragging ||
                           app.dragging.hasClass('curation-item')
                            ? '.curation-item,.curation-topic'
                            : '.curation-topic'));

        /*
        var $srcTags   = $src.parent().find( '> '+ $src.prop('tagName') ),
            $tgtTags   = $tgt.parent().find( '> '+ $tgt.prop('tagName') );

        console.log("TopicView::dragDrop: src[ %s-%d.%s ]",
                    $src.prop('tagName'),
                    $srcTags.index($src),
                    $src.attr('class'));
        console.log("TopicView::dragDrop: tgt[ %s-%d.%s ]",
                    $tgt.prop('tagName'),
                    $tgtTags.index($tgt),
                    $tgt.attr('class'));
        // */

        /* :NOTE:
         *  The drop of an external item is now handled by sbDrop() in the main
         *  sidebar view where the dataTransfer object is normalized and
         *  attached to a new, custom 'dropExternal' event.  The original
         *  'drop' event *should have been* canceled and the new 'dropExternal'
         *  event fired.
         *
         *  If that's working correctly, we should *never* reach this point
         *  without a valid in 'app.dragging'.
         */
        if (! app.dragging)
        {
            console.log("TopicView::dragDrop: *** "
                        +   "app.dragging shouldn't be null");
            return;
        }

        if ($tgt.get(0) !== $src.get(0))
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
    },

    /** @brief  Handle the custom 'dropExternal' event triggered by the main
     *          sidebar view when an external resource is dropped.
     *
     *  This custom event should have a normalized dataTransfer object in
     *  'detail'.
     */
    dragDropExternal: function(e) {
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

        // /*
        var $tgtTags   = $tgt.parent().find( '> '+ $tgt.prop('tagName') );

        console.log("TopicView::dragDrop: tgt[ %s-%d.%s ]",
                    $tgt.prop('tagName'),
                    $tgtTags.index($tgt),
                    $tgt.attr('class'));
        // */

        var $after  = ($tgt.hasClass('curation-item')
                        ? $tgt
                        : self.$items.children().last()),
            items   = dataTransfer2Items(self.options.model, dataTransfer);

        // Create new item(s) add them to the item list.
        _.each(items, function(item) {
            var view    = new app.view.ItemView({model:item});
            if ($after.length < 1)
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
});

/****************************************************************************
 * drag-and-drop {
 *
 */

/** @brief  Given a drag-and-drop dataTransfer object (that has been made
 *          client-side accessible via our addon's drag-and-drop handler),
 *          generate a matching set of items representing the raw item data.
 *  @param  topic           The topic associated with this drop;
 *  @param  dataTransfer    The dataTransfer object from a drag-and-drop Drop
 *                          request -- possibly "normalized" by the main
 *                          sidebar view and delivered via 'dropExternal'
 *                          custom event;
 *
 *  @return An array of item objects;
 */
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
/* drag-and-drop }
 ****************************************************************************/

}