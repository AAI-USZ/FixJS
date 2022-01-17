function(
    declare,
    event,
    lang,
    domConstruct,
    domClass,
    domAttr,
    query,
    nodeListManipulate,
    _UiComponent,
    _EventMapMixin,
    _Field,
    _CompositeMixin,
    scene
) {

    /*
     CollectionEntryInlineField (each item is a form)
     CollectionEntryField (list then form)
     CollectionField (external list / editor)
     */

    /* todo: this will be importing a number of ideas from List/Edit; find a way to re-use */
    return declare('Sage.Platform.Mobile.Fields.CollectionEntryField', [_Field, _UiComponent, _EventMapMixin, _CompositeMixin], {
        events: {
            'click': true
        },
        components: [
            {name: 'collection', tag: 'ul', attrs: {'class': 'list-content'}, attachPoint: 'collectionNode'},
            {name: 'content', tag: 'div', attrs: {'class': 'edit-content'}, attachPoint: 'contentNode'},
            {name: 'actions', tag: 'div', attrs: {'class': 'edit-actions'}, components: [
                {name: 'add', content: Simplate.make('<button class="button" data-action="add">{%: $.addItemText %}</button>')}
            ]}
        ],
        baseClass: 'field-collection-entry',
        containerClass: 'row-collection-entry',
        collectionNode: null,
        contentNode: null,

        /* todo: make generic */
        idProperty: '$key',
        itemsProperty: '$resources',
        labelProperty: '$descriptor',

        collectionRowTemplate: new Simplate([
            '<li data-index="{%= $$.getIndex($) %}">',
            '{%! $$.collectionItemTemplate %}',
            '</li>'
        ]),
        collectionItemTemplate: new Simplate([
            '<h3>{%: $$.getLabel($) %}</h3>',
            '<h4>{%: $$.getIdentity($) %}</h4>'
        ]),

        currentItems: null,
        currentIndex: null,

        lookupLabelText: 'edit',
        lookupText: '...',
        emptyText: 'empty',
        completeText: 'OK',
        addItemText: 'Add',

        getIndex: function(item) {
            return this.currentIndex;
        },
        getIdentity: function(item) {
            return item[this.identityProperty];
        },
        getLabel: function(item) {
            return item[this.labelProperty];
        },
        constructor: function() {
            this.sourceItems = [];
            this.currentItems = [];
        },
        complete: function(view, item) {
            var success = true;

            if (view instanceof Sage.Platform.Mobile.Edit)
            {
                view.hideValidationSummary();

                if (view.validate() !== false)
                {
                    view.showValidationSummary();
                    return;
                }
            }

            this.getValuesFromView(view);

            this.setText(this.formatValue(this.validationValue));

            // todo: remove
            if (view.isValid && !view.isValid())
                return;
            else
                ReUI.back();

            // if the event is fired before the transition, any XMLHttpRequest created in an event handler and
            // executing during the transition can potentially fail (status 0).  this might only be an issue with CORS
            // requests created in this state (the pre-flight request is made, and the request ends with status 0).
            // wrapping thing in a timeout and placing after the transition starts, mitigates this issue.
            if (success) setTimeout(lang.hitch(this, this._onComplete), 0);
        },
        _onComplete: function() {
            this.onChange(this.currentValue, this);
        },
        setText: function(text) {
            this.set('inputValue', text);
        },
        isDirty: function() {
            var original = this.originalValue,
                current = this.currentValue;

            if (current == original) return false;
            if (current && !original) return true;
            if (current.length != original.length) return true;

            for (var i = 0; i < current.length; i++)
            {
                if (current[i] !== original[i]) return true;
            }

            return false;
        },
        getValue: function() {
            var original = this.originalValue,
                current = this.currentValue,
                value = [];

            if (current)
            {
                /* todo: how to tag for deletion? */
                var result = [];

                for (var i = 0; i < current.length; i++)
                {
                    if (current[i] && current[i] !== original[i]) value.push(current[i]);
                }
            }

            return value;
        },
        _processData: function(items) {
            var count = items.length;
            if (count > 0)
            {
                var output = [];

                for (var i = 0; i < count; i++)
                {
                    var item = items[i];

                    this.currentIndex = i;

                    output.push(this.collectionRowTemplate.apply(item, this));
                }

                if (output.length > 0) domConstruct.place(output.join(''), this.collectionNode, 'last');

                domClass.add(this.domNode, 'has-items');
            }
        },
        setValue: function(val, initial)
        {
            if (val)
            {
                this.validationValue = this.currentValue = val.slice(0);

                if (initial) this.originalValue = val;

                this._processData(val);
            }
            else
            {
                this.validationValue = this.currentValue = [];

                if (initial) this.originalValue = [];

                domConstruct.empty(this.collectionNode);
            }
        },
        clearValue: function() {
            this.setValue(null, true);
        },
        add: function() {
            var index = ++this.currentIndex,
                item = this._getCompositeValues();

            this.currentValue[index] = item;

            domConstruct.place(this.collectionRowTemplate.apply(item, this), this.collectionNode, 'last');

            domClass.add(this.domNode, 'has-items');
        }
    });
}