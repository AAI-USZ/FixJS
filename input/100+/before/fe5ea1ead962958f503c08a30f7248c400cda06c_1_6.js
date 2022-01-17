function (_, $) {
    "use strict";

    var foreachExpando = "__cid__",
        // IE 9 cannot reliably read the "nodeValue" property of a comment node (see https://github.com/SteveSanderson/knockout/issues/186)
        // but it does give them a nonstandard alternative property called "text" that it can read reliably. Other browsers don't have that property.
        // So, use node.text where available, and node.nodeValue elsewhere
        commentNodesHaveTextProperty = document.createComment("test").text === "<!--test-->",
        startCommentRegex = commentNodesHaveTextProperty ? /^<!--\s*data-bind\s+(.*\:.*)\s*-->$/ : /^\s*data-bind\s+(.*\:.*)\s*$/,
        endCommentRegex = commentNodesHaveTextProperty ? /^<!--\s*\/data-bind\s*-->$/ : /^\s*\/data-bind\s*$/;

    function isStartComment (element)
    {
        return (element.nodeType == 8) && (commentNodesHaveTextProperty ? element.text : element.nodeValue).match(startCommentRegex);
    }

    function isEndComment (element)
    {
        return (element.nodeType == 8) && (commentNodesHaveTextProperty ? element.text : element.nodeValue).match(endCommentRegex);
    }

    /**
     * Renders an individual item from a foreach binder's collection.
     * @private
     * @param {Object} element The dom element the foreach binder is bound to.
     * @param {Object} model The model this item is bound to.
     * @param {Object} template The markup template for the item.
     * @param {Object} viewModel The model the foreach binder is bound to.
     * @param {Object} at The index to insert the item at.
     * @param {Object} info The binding info for the foreach binding.
     */
    function renderItem (element, model, template, viewModel, at, info)
    {
        var itemElements = $("<div></div>").html(template).contents(),
            cid = model.get("cid");

        viewModel.fire('foreach-render', { nodes: itemElements, model: model, at: at }, function () {
            if (_.isNumber(at)) {
                if (at === 0) {
                    itemElements.prependTo(element);
                }
                else {
                    $('> tr', element).eq(at - 1).after(itemElements);
                }
            }
            else {
                itemElements.appendTo(element);
            }

            itemElements.each(function () {
                this[foreachExpando] = cid;
                databindings.databind.applyBindings(model, this, info.context);
            });
        });
    }

    /**
     * Resets the dom for the new items in the foreach's collection.
     * @private
     * @param {Object} element The dom element the foreach binder is bound to.
     * @param {Object} col The collection the foreach binder is bound to.
     * @param {Object} viewModel The model the foreach binder is bound to.
     * @param {Object} info The binding info for the foreach binding.
     * @param {Object} metaData The meta data for the foreach binding.
     */
    function resetItems (element, col, viewModel, info, metaData)
    {
        var template = metaData.template;

        viewModel.fire('foreach-reset', { element: element, collection: col, viewModel: viewModel }, function () {
            // Remove the bindings from the existing foreach items
            $(element).contents().each(function () {
                databindings.databind.removeBindings(this);
            });

            $(element).empty();

            if (col) {
                col.each(function (model) {
                    renderItem(element, model, template, viewModel, void(0), info);
                });
            }
        });
    }

    /**
     * Handler for when models are added to the foreach's collection.
     * @private
     * @param {Object} element The dom element the foreach binder is bound to.
     * @param {Object} viewModel The model the foreach binder is bound to.
     * @param {Object} info The binding info for the foreach binding.
     * @param {Object} metaData The meta data for the foreach binding.
     * @param {Object} e The event object.
     */
    function afterModelsAdded (element, viewModel, info, metaData, e)
    {
        var template = metaData.template,
            at = e.info.options.at;

        _.each(e.info.items, function (model, index) {
            renderItem(element, model, template, viewModel, at, info);
        }, this);
    }

    /**
     * Handler for when models are removed from the foreach's collection.
     * @private
     * @param {Object} element The dom element the foreach binder is bound to.
     * @param {Object} viewModel The model the foreach binder is bound to.
     * @param {Object} info The binding info for the foreach binding.
     * @param {Object} metaData The meta data for the foreach binding.
     * @param {Object} e The event object.
     */
    function afterModelsRemoved (element, viewModel, info, metaData, e)
    {
        var itemElements = $(element).contents();

        // If there is a list view then remove each model from it
        _.each(e.info.items, function (model) {
            var cid = model.get("cid");

            // Remove the item from the dom
            itemElements.each(function () {
                if (this[foreachExpando] === cid) {
                    databindings.databind.removeBindings(this);
                    $(this).remove();
                    return false;
                }
            });
        }, this);
    }

    /**
     * Handler for when the foreach's collection is reset.
     * @private
     * @param {Object} element The dom element the foreach binder is bound to.
     * @param {Object} viewModel The model the foreach binder is bound to.
     * @param {Object} info The binding info for the foreach binding.
     * @param {Object} metaData The meta data for the foreach binding.
     * @param {Object} e The event object.
     */
    function afterReset (element, viewModel, info, metaData, e)
    {
        resetItems(element, e.src, viewModel, info, metaData);
    }

    /**
     * Handler for when the foreach's collection is sorted.
     * @private
     * @param {Object} element The dom element the foreach binder is bound to.
     * @param {Object} viewModel The model the foreach binder is bound to.
     * @param {Object} info The binding info for the foreach binding.
     * @param {Object} metaData The meta data for the foreach binding.
     * @param {Object} e The event object.
     */
    function afterSort (element, viewModel, info, metaData, e)
    {
        resetItems(element, e.src, viewModel, info, metaData);
    }

    /**
     * Handler for when the value binder's dom element's value changes.
     * @private
     * @param {Object} element The dom element the value binder is bound to.
     * @param {Object} metaData The meta data for the value binding.
     */
    function afterValueChanged (element, metaData)
    {
        var el = $(element);

        // TODO: might not want to do this (same thing for afterCheckedChanged)
        // Setting the value on the view model might be rejected if the value did not validate. If that happens then update the element's value to stay in sync with the view model.
        if (!metaData.viewModel.set(metaData.attributeName, el.val())) {
            el.val(metaData.viewModel.get(metaData.attributeName));
        }
    }

    /**
     * Handler for when the value binder's dom element's value changes.
     * @private
     * @param {Object} element The dom element the value binder is bound to.
     * @param {Object} metaData The meta data for the value binding.
     * @param {Object} info The extra information about the binding.
     */
    function afterCheckedChanged (element, metaData, info)
    {
        var el, value;

        if (element.type === "checkbox") {
            if (!metaData.viewModel.set(metaData.attributeName, info["!"] ? !element.checked : element.checked)) {
                value = metaData.viewModel.get(metaData.attributeName);
                element.checked = info["!"] ? !value : !!value;
            }
        }
        else if (element.type === "radio") {
            el = $(element);
            if (!metaData.viewModel.set(metaData.attributeName, el.val())) {
                element.checked = (metaData.viewModel.get(metaData.attributeName) === el.val());
            }
        }
    }
    
    /**
     * @class databindings
     * Provides the logic and behavior for individual data binders. Fires events on behalf of the bound view model.
     * @singleton
     */
    /**
     * @event foreach-reset
     * Fires when a foreach binding is re-rendering markup from it's collection being reset.
     */
    /**
     * @event foreach-render
     * Fires when a foreach binding is rendering an item.
     */
    /**
     * The databind object that applies these binders to dom elements.
     * @property databind
     * @type Object
     */
    var databindings = {
        /**
         * @class text
         * The text binder binds a model's attribute value to the text content of a dom element.
         * @singleton
         * @namespace databindings
         */
        text: {
            update: function (element, value)
            {
                $(element).text(value);
            }
        },

        /**
         * @class html
         * The html binder binds a model's attribute value to the html content of a dom element.
         * @singleton
         * @namespace databindings
         */
        html: {
            update: function (element, value)
            {
                $(element).html(value);
            }
        },

        /**
         * @class attr
         * The attr binder binds a model's attribute value to a dom element's attribute.
         * @singleton
         * @namespace databindings
         */
        attr: {
            update: function (element, value, oldValue, viewModel, attributeName, info, metaData)
            {
                // If a '!' operation then it can be assumed this is an attribute that either exists or does not exist on an element (disabled, required, etc)
                if (info["!"]) {
                    if (value) {
                        element.removeAttribute(info.key);
                    }
                    else {
                        element.setAttribute(info.key, "");
                    }
                }
                else {
                    if (value === false || value === null || _.isUndefined(value)) {
                        element.removeAttribute(info.key);
                    }
                    else {
                        element.setAttribute(info.key, value.toString());
                    }
                }
            }
        },

        /**
         * @class className
         * The className binder binds a model's attribute value to a dom element's class names.
         * @singleton
         * @namespace databindings
         */
        className: {
            update: function (element, value, oldValue, viewModel, attributeName, info, metaData)
            {
                $(element).toggleClass(info.key, info["!"] ? !value : !!value);
            }
        },

        /**
         * @class class
         * The class binder binds a model's attribute value to a dom element's class names.
         * @singleton
         * @namespace databindings
         */
        "class": {
            update: function (element, value, oldValue, viewModel, attributeName, info, metaData)
            {
                $(element).removeClass(oldValue);
                $(element).addClass(value);
            }
        },

        /**
         * @class checked
         * The checked binder binds a model's attribute value to a checkbox's checked property. By default this binder uses two way binding.
         * @singleton
         * @namespace databindings
         */
        checked: {
            start: function (element, value, info, metaData)
            {
                // If this is two-way binding
                if (!info["-"]) {
                    var listener = _.bind(afterCheckedChanged, null, element, metaData, info);
                    metaData.checkedListener = listener;
                    $(element).change(listener);
                }
            },

            stop: function (element, metaData)
            {
                if (_.isFunction(metaData.checkedListener)) {
                    $(element).unbind("change", metaData.checkedListener);
                }

                delete metaData.checkedListener;
                delete metaData.viewModel;
                delete metaData.attributeName;
            },

            update: function (element, value, oldValue, viewModel, attributeName, info, metaData)
            {
                // If this is two-way binding
                if (!info["-"]) {
                    metaData.viewModel = viewModel;
                    metaData.attributeName = attributeName;
                }

                if (element.type === "checkbox") {
                    element.checked = info["!"] ? !value : !!value;
                }
                else if (element.type === "radio") {
                    element.checked = (value === $(element).val());
                }
            }
        },

        /**
         * @class value
         * The value binder binds a model's attribute value to an input's value property. By default this binder uses two way binding.
         * @singleton
         * @namespace databindings
         */
        value: {
            start: function (element, value, info, metaData)
            {
                // If this is two-way binding
                if (!info["-"]) {
                    var listener = _.bind(afterValueChanged, null, element, metaData);
                    metaData.changeListener = listener;
                    $(element).change(listener);
                }
            },

            stop: function (element, metaData)
            {
                if (_.isFunction(metaData.changeListener)) {
                    $(element).unbind("change", metaData.changeListener);
                }

                delete metaData.changeListener;
                delete metaData.viewModel;
                delete metaData.attributeName;
            },

            update: function (element, value, oldValue, viewModel, attributeName, info, metaData)
            {
                // If this is two-way binding
                if (!info["-"]) {
                    metaData.viewModel = viewModel;
                    metaData.attributeName = attributeName;
                }

                $(element).val(value);
            }
        },

        /**
         * @class foreach
         * The foreach binder binds a collection to a dom element's content.
         * @singleton
         * @namespace databindings
         */
        foreach: {
            bindChildren: false,

            start: function (element, value, info, metaData)
            {
                metaData.template = $(element).html();
                $(element).empty();
            },

            stop: function (element, metaData)
            {
                var viewModel = metaData ? metaData.viewModel : null;

                if (viewModel) {
                    viewModel.detachAfter("add", metaData.addListener);
                    viewModel.detachAfter("remove", metaData.removeListener);
                    viewModel.detachAfter("reset", metaData.resetListener);
                    viewModel.detachAfter("sort", metaData.sortListener);
                }

                delete metaData.viewModel;
                delete metaData.template;
                delete metaData.addListener;
                delete metaData.removeListener;
                delete metaData.resetListener;
                delete metaData.sortListener;
            },

            update: function (element, value, oldValue, viewModel, attributeName, info, metaData)
            {
                var listener;

                // TODO: test to make sure oldValue is the collection and not something else
                if (oldValue) {
                    oldValue.detachAfter("add", metaData.addListener);
                    oldValue.detachAfter("remove", metaData.removeListener);
                    oldValue.detachAfter("reset", metaData.resetListener);
                    oldValue.detachAfter("sort", metaData.sortListener);
                }

                if (value) {
                    metaData.viewModel = value;

                    listener = _.bind(afterModelsAdded, null, element, viewModel, info, metaData);
                    metaData.addListener = listener;
                    value.after("add", listener);

                    listener = _.bind(afterModelsRemoved, null, element, viewModel, info, metaData);
                    metaData.removeListener = listener;
                    value.after("remove", listener);

                    listener = _.bind(afterReset, null, element, viewModel, info, metaData);
                    metaData.resetListener = listener;
                    value.after("reset", listener);

                    listener = _.bind(afterSort, null, element, viewModel, info, metaData);
                    metaData.sortListener = listener;
                    value.after("sort", listener);
                }

                resetItems(element, value, viewModel, info, metaData);
            }
        },

        /**
         * @class if
         * The if binder binds whether or not a dom element's children are rendered
         * @singleton
         * @namespace databindings
         */
        'if': {
            bindChildren: false,

            start: function (element, value, info, metaData)
            {
                if (info.isComment) {
                    metaData.template = info.commentTemplate;
                }
                else {
                    metaData.template = $(element).html();
                    $(element).empty();
                }
                
            },

            stop: function (element, metaData)
            {
                delete metaData.template;
            },

            update: function (element, value, oldValue, viewModel, attributeName, info, metaData)
            {
                var node = $(element),
                    itemElements, sibling, nextSibling, isAnEndComment;

                // Remove content
                if (info.isComment) {
                    // Remove the siblings
                    sibling = element.nextSibling;

                    while (sibling && !(isAnEndComment = isEndComment(sibling))) {
                        nextSibling = sibling.nextSibling;
                        databindings.databind.removeBindings(sibling);
                        $(sibling).remove();
                        sibling = nextSibling;
                    }

                    if (!isAnEndComment) {
                        throw new Error("Databind (comment if) is missing end tag.");
                    }
                }
                else {
                    // Remove the children
                    node.contents().each(function () {
                        databindings.databind.removeBindings(this);
                    });
                    node.empty();
                }

                // If the element's content should be rendered
                if (info["!"] ? !value : !!value) {
                    // Render the content
                    if (info.isComment) {
                        // Render the siblings
                        $("<div></div>").html(metaData.template).contents().insertAfter(node).each(function () {
                            databindings.databind.applyBindings(info.context.root, this);
                        });
                    }
                    else {
                        // Render the new children
                        node.html(metaData.template).contents().each(function () {
                            databindings.databind.applyBindings(info.context.root, this);
                        });
                    }
                }
            }
        }
    };

    return databindings;
}