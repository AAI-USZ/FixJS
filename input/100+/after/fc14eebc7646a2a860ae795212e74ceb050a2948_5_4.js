function(
    declare,
    lang,
    query,
    nodeListManipulate,
    topic,
    domConstruct,
    domStyle,
    domClass,
    domAttr,
    _WidgetBase,
    _EventMapMixin,
    _UiComponent,
    utility
) {
    return declare('Sage.Platform.Mobile.Toolbar', [_WidgetBase, _EventMapMixin, _UiComponent], {
        events: {
            '.tool-button:click': '_onToolClick'
        },
        baseClass: 'toolbar',
        position: 'top',
        components: [],
        itemTemplate: new Simplate([
            '<button class="button tool-button {%= $$.cls %}"',
                    'data-tool="{%= $.name %}" aria-label="{%: $$.title || $.name %}">',
                '{% if ($$.icon) { %}',
                '<img src="{%= $$.icon %}" alt="{%= $.name %}" />',
                '{% } else { %}',
                '<span></span>',
                '{% } %}',
            '</button>'
        ]),
        items: null,
        _size: 0,
        _items: null,
        _itemsByName: null,
        _onToolClick: function(evt, node) {
            var name = domAttr.get(node, 'data-tool');
            if (name) this._invokeTool(name);
        },
        _invokeTool: function(name) {
            var item = this._itemsByName[name],
                source = item && item.source;
            if (source)
            {
                if (source.fn)
                {
                    source.fn.call(source.scope || this, source);
                }
                else if (source.action)
                {
                    var root = this.getComponentRoot(),
                        method = root[source.action];

                    if (typeof method === 'function') method.call(root, source);
                }
                else if (source.publish)
                {
                    topic.publish(source.publish, [source]);
                }
            }
        },
        _getPositionAttr: function() {
            return this.position;
        },
        _setPositionAttr: function(value) {
            var previous = this.position;

            domClass.remove(this.domNode, 'toolbar-' + previous);
            domClass.add(this.domNode, 'toolbar-' + value);

            this.position = value;

            this.onPositionChange(value, previous);
        },
        onPositionChange: function(position, previous) {
        },
        onCreate: function() {
            this.inherited(arguments);
            this.onPositionChange(this.position, null);
        },
        clear: function() {
            this._remove();

            this._items = {};
        },
        update: function() {
            var count = {left: 0, right: 0},
                items = this._items;

            for (var i = 0; i < items.length; i++)
            {
                var item = items[i];

                this._updateItemState(item);

                if (item.visible) count[item.side] += 1;

                this._applyItemStateToDom(item);
            }

            var size = Math.max(count['left'], count['right']);

            domAttr.set(this.domNode, 'data-item-count', size);

            this._size = size;

            this.onContentChange();
        },
        _renderItem: function(item) {
            var node = domConstruct.toDom(this.itemTemplate.apply(item, item.source));

            item.domNode = node;

            domClass.add(node, 'on-' + item.side);

            this._applyItemStateToDom(item);

            domConstruct.place(node, this.containerNode || this.domNode);

            return node;
        },
        _updateItemState: function(item) {
            var source = item.source,
                visible = utility.expand(this, source.visible),
                enabled = utility.expand(this, source.enabled);

            item.visible = typeof visible !== 'undefined' ? visible : true;
            item.enabled = typeof enabled !== 'undefined' ? enabled : true;
        },
        _applyItemStateToDom: function(item) {
            var node = item.domNode;

            domClass.toggle(node, 'is-disabled', !item.enabled);
            domClass.toggle(node, 'is-hidden', !item.visible);
        },
        _remove: function() {
            query("> .tool", this.domNode).remove();

            this.onContentChange();
        },
        _setItemsAttr: function(values) {
            var items = [],
                itemsByName = {},
                count = {left: 0, right: 0};

            if (typeof values == 'undefined') return;

            this._remove();

            for (var i = 0; i < values.length; i++) {
                var source = values[i],
                    item = {
                        domNode: null,
                        name: source.name || source.id,
                        side: source.side || 'right',
                        busy: false,
                        visible: true,
                        enabled: true,
                        source: source
                    };

                this._updateItemState(item);

                if (item.visible) count[item.side] += 1;

                this._renderItem(item);

                items.push(item);

                items[item.name] = item;
            }

            var size = Math.max(count['left'], count['right']);

            /* todo: track each side seprately? */
            domAttr.set(this.domNode, 'data-tool-count', size);

            this._size = size;
            this._items = items;
            this._itemsByName = itemsByName;

            this.onContentChange();
        },
        _getItemsAttr: function() {
            return this._items;
        },
        onContentChange: function() {
        }
    });
}