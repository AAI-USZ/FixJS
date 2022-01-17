f    "use strict";

    var dataBindAttributeName = "data-bind",
        elementExpando = "__databind__",
        metaDataKeyUniqueId = 0,
        elementMetaDataStore = {},
        bindingOperators = ["!", "-"],
        restoreCapturedTokensRegex = /\@ko_token_(\d+)\@/g,
        // IE 9 cannot reliably read the "nodeValue" property of a comment node (see https://github.com/SteveSanderson/knockout/issues/186)
        // but it does give them a nonstandard alternative property called "text" that it can read reliably. Other browsers don't have that property.
        // So, use node.text where available, and node.nodeValue elsewhere
        commentNodesHaveTextProperty = document.createComment("test").text === "<!--test-->",
        startCommentRegex = commentNodesHaveTextProperty ? /^<!--\s*data-bind\s+(.*\:.*)\s*-->$/ : /^\s*data-bind\s+(.*\:.*)\s*$/,
        endCommentRegex = commentNodesHaveTextProperty ? /^<!--\s*\/data-bind\s*-->$/ : /^\s*\/data-bind\s*$/,
        databind;

    /**
     * Creates and stores the meta data for a binding.
     * @private
     * @param {Object} element The dom element in the binding.
     * @param {Object} binder The binder used to bind the data and dom element.
     * @param {String} binderTypeKey The binder key.
     * @param {String} attributeNameChain The attribute name path for the model in the binding.
     * @return {Object} Returns the meta data for the binding.
     */
    function createMetaData (element, binder, binderTypeKey, attributeNameChain)
    {
        var metaDataKey = element[elementExpando],
            binderKey = binderTypeKey + ":" + attributeNameChain.join("."),
            elementMetaData, binderMetaData;

        if (!_.isString(metaDataKey)) {
            metaDataKey = element.nodeName + ":" + metaDataKeyUniqueId++;
            element[elementExpando] = metaDataKey;
        }

        elementMetaData = elementMetaDataStore[metaDataKey];

        if (!_.isObject(elementMetaData)) {
            elementMetaData = {};
            elementMetaDataStore[metaDataKey] = elementMetaData;
        }

        binderMetaData = elementMetaData[binderKey];
        if (!_.isObject(binderMetaData)) {
            binderMetaData = {};
            elementMetaData[binderKey] = binderMetaData;
        }

        binderMetaData.binder = binder;

        return binderMetaData;
    }

    /**
     * Gets the meta data for a binding. Optionally creates the meta data if it does not exist.
     * @private
     * @param {Object} element The dom element in the binding.
     * @param {Object} binder The binder used to bind the data and dom element.
     * @param {String} binderTypeKey The binder key.
     * @param {String} attributeNameChain The attribute name path for the model in the binding.
     * @param {Boolean} createIfNotFound (Optional) Whether or not to create meta data if it is not found. Defaults to false.
     * @return {Object} Returns the meta data for the binding.
     */
    function getMetaData (element, binder, binderTypeKey, attributeNameChain, createIfNotFound)
    {
        var metaDataKey = element[elementExpando],
            elementMetaData, binderMetaData;

        if (_.isString(metaDataKey)) {
            elementMetaData = elementMetaDataStore[metaDataKey];

            if (_.isObject(elementMetaData)) {
                binderMetaData = elementMetaData[binderTypeKey + ":" + attributeNameChain.join(".")];

                if (_.isObject(binderMetaData)) {
                    return binderMetaData;
                }
            }
        }

        if (createIfNotFound) {
            return createMetaData(element, binder, binderTypeKey, attributeNameChain);
        }

        return null;
    }

    /**
     * Deletes the meta data for an element. The meat data for every binding on the element is deleted.
     * @private
     * @param {Object} element The dom element to remove the binding meta data of.
     */
    function removeMetaData (element)
    {
        var metaDataKey = element[elementExpando],
            elementMetaData;

        if (_.isString(metaDataKey)) {
            elementMetaData = elementMetaDataStore[metaDataKey];

            if (_.isObject(elementMetaData)) {
                _.each(elementMetaData, function (binderMetaData) {
                    if (_.isObject(binderMetaData.model)) {
                        if (_.isFunction(binderMetaData.listener) && _.isString(binderMetaData.eventName)) {
                            binderMetaData.model.detachAfter(binderMetaData.eventName, binderMetaData.listener);
                        }

                        if (_.isFunction(binderMetaData.destroyListener))  {
                            binderMetaData.model.detachOn("destroy", binderMetaData.destroyListener);
                        }
                    }

                    // Tell the binder to stop so that it can clean up (e.g. event listeners)
                    if (_.isObject(binderMetaData.binder) && _.isFunction(binderMetaData.binder.stop)) {
                        binderMetaData.binder.stop(element, binderMetaData);
                    }
                });
            }

            delete elementMetaDataStore[metaDataKey];
            element[elementExpando] = null;
        }
    }

    /**
     * Gets the meta data for an element. The element's meta data contains the meta data for all the bindings on the element.
     * @private
     * @param {Object} element The dom element to get the meta data of.
     */
    function getElementMetaData (element)
    {
        var metaDataKey = element[elementExpando];

        if (_.isString(metaDataKey)) {
            return elementMetaDataStore[metaDataKey];
        }
    }

    /**
     * Attaches event listeners to the model that a binding uses.
     * @private
     * @param {Object} binder The binder used to bind the model and the dom element.
     * @param {Object} viewModel The model being bound to the element.
     * @param {Array} attributeNameChain The attribute name path for the value being bound.
     * @param {Object} binderInfo Information about the binding which contains the binding key, binding operators, and dom element.
     */
    function attachBinder (binder, viewModel, attributeNameChain, binderInfo)
    {
        var listener, metaData, i;

        if (attributeNameChain.length > 1) {
            // If this binding should be done using the view model's parent
            if (attributeNameChain[1] !== '$parent') {
                // Listen for the attribute value changing
                listener = _.bind(updateBinder, null, binder, viewModel, attributeNameChain.slice(1), binderInfo);
                
                metaData = getMetaData(binderInfo.element, binder, binderInfo.key, attributeNameChain, true);
                metaData.eventName = attributeNameChain[1] + "Change";
                metaData.listener = listener;
                metaData.model = viewModel;

                viewModel.after(attributeNameChain[1] + "Change", listener);

                // Listen for the view model being destroyed
                listener = _.bind(detachBinder, null, binder, viewModel, attributeNameChain, binderInfo);
                metaData.destroyListener = listener;
                viewModel.on("destroy", listener);

                // Attach the binding for the next name in the attribute chain
                attachBinder(binder, viewModel.get(attributeNameChain[1]), attributeNameChain.slice(1), binderInfo);

                // If this is the last view model then start the binder up using it and update its value
                if (attributeNameChain.length === 2) {
                    startBinder(binder, viewModel, [attributeNameChain[1]], binderInfo);
                    updateBinder(binder, viewModel, [attributeNameChain[1]], binderInfo);
                }
            }
            else {
                // $parent has been encountered in the attribute name chain. Move along the chain for each $parent
                i = 1;
                do {
                    viewModel = binderInfo.context.parents[binderInfo.context.parents.length - i];
                    i += 1;
                } while (attributeNameChain[i] === '$parent');

                // Attach the binding for the context's parent
                attachBinder(binder, viewModel, attributeNameChain.slice(i - 1), binderInfo);
            }
        }
    }

    /**
     * Starts up a binder by calling its start method.
     * @private
     * @param {Object} binder The binder used to bind the model and the dom element.
     * @param {Object} viewModel The model being bound to the element.
     * @param {Array} attributeNameChain The attribute name path for the value being bound.
     * @param {Object} binderInfo Information about the binding which contains the binding key, binding operators, and dom element.
     */
    function startBinder (binder, viewModel, attributeNameChain, binderInfo)
    {
        if (_.isFunction(binder.start)) {
            binder.start(binderInfo.element, viewModel.get(attributeNameChain[0]), binderInfo, getMetaData(binderInfo.element, binder, binderInfo.key, attributeNameChain, true));
        }
    }

    /**
     * Handles attribute value changes on the model. This function does two things depending on where it is in the attribute name chain.
     * When at the end of the chain the binder's update method is invoked so that it can sync the value in the model to the dom element.
     * When not at the end of the chain this function updates event listeners to listen to the new attribute values.
     * @private
     * @param {Object} binder The binder used to bind the model and the dom element.
     * @param {Object} viewModel The model being bound to the element.
     * @param {Array} attributeNameChain The attribute name path for the value being bound.
     * @param {Object} binderInfo Information about the binding which contains the binding key, binding operators, and dom element.
     * @param {Object} e (Optional) The event data from the model attribute change event.
     */
    function updateBinder (binder, viewModel, attributeNameChain, binderInfo, e)
    {
        var oldViewModel = e ? e.info.oldValue : null;
        
        // If the element is a comment node and has been removed from the dom since the binding was setup
        if (binderInfo.element.nodeType === 8 && !$.containsComment(document.body, binderInfo.element)) {
            unbindElement(binderInfo.element);
        }
        // Else if the element has been removed from the dom since the binding was setup
        else if (binderInfo.element.nodeType !== 8 && !$.contains(document.body, binderInfo.element)) {
            unbindElement(binderInfo.element);
        }
        else if (attributeNameChain.length > 1) {
            if (oldViewModel) {
                detachBinder(binder, oldViewModel, attributeNameChain, binderInfo);
            }
            attachBinder(binder, viewModel.get(attributeNameChain[0]), attributeNameChain, binderInfo);
        }
        else {
            binder.update(binderInfo.element, viewModel.get(attributeNameChain[0]), oldViewModel, viewModel, attributeNameChain[0], binderInfo, getMetaData(binderInfo.element, binder, binderInfo.key, attributeNameChain, true));
        }
    }

    /**
     * Removes the event listeners from the model.
     * @private
     * @param {Object} binder The binder used to bind the model and the dom element.
     * @param {Object} viewModel The model bound to the element.
     * @param {Array} attributeNameChain The attribute name path for the value that is bound.
     * @param {Object} binderInfo Information about the binding which contains the binding key, binding operators, and dom element.
     */
    function detachBinder (binder, viewModel, attributeNameChain, binderInfo)
    {
        if (attributeNameChain.length > 1) {
            var metaData = getMetaData(binderInfo.element, binder, binderInfo.key, attributeNameChain);
            if (metaData && metaData.listener) {
                viewModel.detachAfter(attributeNameChain[1] + "Change", metaData.listener);
                delete metaData.eventName;
                delete metaData.listener;
                delete metaData.model;
            }
            
            detachBinder(binder, viewModel.get(attributeNameChain[1]), attributeNameChain.slice(1), binderInfo);
        }
    }

    /**
     * Restores the tokens that were replaced during parsing.
     * Thanks go to Steve Sanderson's KnockoutJS for this function.
     * @private
     * @param {String} string The string to restore the tokens in.
     * @param {Array} tokens The tokens being restored.
     * @return {String} Returns the string with its tokens restored.
     */
    function restoreTokens (string, tokens)
    {
        var prevValue = null;
        while (string != prevValue) { // Keep restoring tokens until it no longer makes a difference (they may be nested)
            prevValue = string;
            string = string.replace(restoreCapturedTokensRegex, function (match, tokenIndex) {
                return tokens[tokenIndex];
            });
        }
        return string;
    }

    /**
     * Parses a binding string from a dom element.
     * Thanks go to Steve Sanderson's KnockoutJS for this function.
     * From KnockoutJS:
     * A full tokeniser+lexer would add too much weight to this library, so here's a simple parser that is sufficient just to split an object literal string into a set of top-level key-value pairs.
     * @private
     * @param {String} objectLiteralString The binding string from a dom element.
     * @return {Array} Returns an array of all the bindings. An item in the array contains the key and value of the binding.
     */
    function parseBindingsObject (objectLiteralString)
    {
        var str = _.trim(objectLiteralString);
        if (str.length < 3)
            return [];
        if (str.charAt(0) === "{")// Ignore any braces surrounding the whole object literal
            str = str.substring(1, str.length - 1);

        // Pull out any string literals and regex literals
        var tokens = [];
        var tokenStart = null, tokenEndChar;
        for (var position = 0; position < str.length; position++) {
            var c = str.charAt(position);
            if (tokenStart === null) {
                switch (c) {
                    case '"':
                    case "'":
                    case "/":
                        tokenStart = position;
                        tokenEndChar = c;
                        break;
                }
            } else if ((c == tokenEndChar) && (str.charAt(position - 1) !== "\\")) {
                var token = str.substring(tokenStart, position + 1);
                tokens.push(token);
                var replacement = "@ko_token_" + (tokens.length - 1) + "@";
                str = str.substring(0, tokenStart) + replacement + str.substring(position + 1);
                position -= (token.length - replacement.length);
                tokenStart = null;
            }
        }

        // Next pull out balanced paren, brace, and bracket blocks
        tokenStart = null;
        tokenEndChar = null;
        var tokenDepth = 0, tokenStartChar = null;
        for (var position = 0; position < str.length; position++) {
            var c = str.charAt(position);
            if (tokenStart === null) {
                switch (c) {
                    case "{": tokenStart = position; tokenStartChar = c;
                              tokenEndChar = "}";
                              break;
                    case "(": tokenStart = position; tokenStartChar = c;
                              tokenEndChar = ")";
                              break;
                    case "[": tokenStart = position; tokenStartChar = c;
                              tokenEndChar = "]";
                              break;
                }
            }

            if (c === tokenStartChar)
                tokenDepth++;
            else if (c === tokenEndChar) {
                tokenDepth--;
                if (tokenDepth === 0) {
                    var token = str.substring(tokenStart, position + 1);
                    tokens.push(token);
                    var replacement = "@ko_token_" + (tokens.length - 1) + "@";
                    str = str.substring(0, tokenStart) + replacement + str.substring(position + 1);
                    position -= (token.length - replacement.length);
                    tokenStart = null;
                }
            }
        }

        // Now we can safely split on commas to get the key/value pairs
        var result = [];
        var keyValuePairs = str.split(",");
        for (var i = 0, j = keyValuePairs.length; i < j; i++) {
            var pair = keyValuePairs[i];
            var colonPos = pair.indexOf(":");
            if ((colonPos > 0) && (colonPos < pair.length - 1)) {
                var key = pair.substring(0, colonPos);
                var value = pair.substring(colonPos + 1);
                result.push({ 'key': restoreTokens(key, tokens), 'value': restoreTokens(value, tokens) });
            } else {
                result.push({ 'unknown': restoreTokens(pair, tokens) });
            }
        }
        return result;
    }

    function isStartComment (element)
    {
        return (element.nodeType == 8) && (commentNodesHaveTextProperty ? element.text : element.nodeValue).match(startCommentRegex);
    }

    function isEndComment (element)
    {
        return (element.nodeType == 8) && (commentNodesHaveTextProperty ? element.text : element.nodeValue).match(endCommentRegex);
    }

    /**
     * Gets the binding string from an element. The binding string is pulled from an attribute on the element.
     * @private
     * @param {Object} element The element to get the binding string of.
     * @return {String} Returns the binding string of the element. If the binding attribute does not exist then undefined is returned.
     */
    function getElementBindingsString (element)
    {
        var match;

        if (element.nodeType === 1) {
            return element.getAttribute(dataBindAttributeName);
        }

        match = isStartComment(element);
        if (match) {
            return match[1];
        }
    }

    /**
     * Gets the bindings for an element. The bindings are pulled from an attribute on the element.
     * @private
     * @param {Object} element The element to get the bindings of.
     * @return {Array} Returns the bindings for the element. If bindings do not exist then null is returned.
     */
    function getElementBindings (element)
    {
        var bindingString = getElementBindingsString(element);
        return bindingString ? parseBindingsObject(bindingString) : null;
    }

    /**
     * Gets the operators on a binding key.
     * @private
     * @param {String} key The binding key to get the operators from.
     * @return {Object} Returns an object containing the binding key with the operators stripped from it. The object also contains the operators as an array of the operator strings.
     */
    function getBindingOperators (key)
    {
        var ops = {};

        for (var i = 0, length = bindingOperators.length; i < length; i += 1) {
            ops[bindingOperators[i]] = false;
        }

        key = _.trim(key);

        while (key && _.indexOf(bindingOperators, key.charAt(0)) !== -1) {
            ops[key.charAt(0)] = true;
            key = key.substring(1);
        }

        return {
            key: key,
            ops: ops
        };
    }

    /**
     * Binds an element and all its descendents to a model.
     * @private
     * @param {Object} element The element to bind to.
     * @param {Object} viewModel The model to bind to.
     * @param {Object} context The context of the binding.
     */
    function bindElement (element, viewModel, context)
    {
        var bindings = getElementBindings(element),
            isStartCommentNode = !!isStartComment(element),
            childNodes = element.childNodes,
            bindChildren = true,
            inCommentContents = false,
            sibling, nextSibling, endCommentElement, commentContainer, isAnEndComment;

        // If this is a start comment node then remove the following siblings until the end comment node is reached
        if (isStartCommentNode) {
            commentContainer = $('<div></div>');
            sibling = element.nextSibling;

            while (sibling && !(isAnEndComment = isEndComment(sibling))) {
                nextSibling = sibling.nextSibling;
                commentContainer.append(sibling);
                sibling = nextSibling;
            }

            if (!isAnEndComment) {
                throw new Error("Databind (comment) is missing end tag.");
            }

            endCommentElement = sibling;
        }

        // Attach each of the bindings that are on the element
        _.each(bindings, function (binding) {
            var operators = getBindingOperators(binding.key),
                bindingInfo, binder;

            bindingInfo = operators.ops;
            bindingInfo.key = operators.key;
            bindingInfo.element = element;
            bindingInfo.context = context;
            bindingInfo.isComment = isStartCommentNode;
            bindingInfo.commentTemplate = isStartCommentNode ? commentContainer.html() : null;
            bindingInfo.endCommentElement = isStartCommentNode ? endCommentElement : null;

            if (_.startsWith(bindingInfo.key, ".")) {
                binder = databindings["className"];
                bindingInfo.key = bindingInfo.key.substring(1);
            }
            else {
                binder = databindings[bindingInfo.key];
            }

            if (!_.isObject(binder)) {
                binder = databindings["attr"];
            }

            if (_.isBoolean(binder.bindChildren)) {
                bindChildren &= binder.bindChildren;
            }

            attachBinder(binder, viewModel, [null].concat(_.trim(binding.value).split(".")), bindingInfo);
        });

        // Bind children
        if (bindChildren) {
            //for (var i = 0, length = childNodes.length; i < length; i += 1) {
            // Do not cache the length of childNodes because comment bindings can change the childNodes object
            for (var i = 0; i < childNodes.length; i += 1) {
                //bindElement(childNodes[i], viewModel, context);

                // If currently looping through a comment's content then don't bind any of the elements
                if (inCommentContents) {
                    // If this is the end of the comment's content
                    if (isEndComment(childNodes[i])) {
                        inCommentContents = false;
                    }
                }
                // Else bind the element
                else {
                    // If this is the start of a comment's content
                    if (isStartComment(childNodes[i])) {
                        inCommentContents = true;
                    }

                    bindElement(childNodes[i], viewModel, context);
                }
            }
        }
    }

    /**
     * Removes all bindings for an element and its descendents. Deletes the element's binding meta data and removes all event listeners.
     * @private
     * @param {Object} element The element to bind to.
     * @param {Object} viewModel The model to bind to.
     */
    function unbindElement (element)
    {
        var childNodes = element.childNodes;
        
        removeMetaData(element);

        // Unbind children
        for (var i = 0, length = childNodes.length; i < length; i += 1) {
            unbindElement(childNodes[i]);
        }
    }
    
    /**
     * @class databind
     * Provides data binding functionality between models and views (dom elements).
     * @singleton
     */
    databind = {
        /**
         * The meta data for all data bindings in the application. Used for debugging and testing purposes.
         * @property
         * @type Array
         * @private
         */
        metaData: elementMetaDataStore,

        /**
         * Returns the binding meta data for an element.
         * @function
         * @param {Object} element The dom element to get the meta data of.
         * @return {Object} Returns the meta data for the dom element. If the element has no bindings then undefined is returned.
         */
        getMetaData: getElementMetaData,

        /**
         * The operators supported by data binders. To add new operators append new values to this array.
         * Operators are single character strings that change the behavior of bindings.
         * The default operators are "!" and "-".
         * "!" acts as a not operator on most binders that make use of it.
         * "-" is only used in default bindings for forcing one way binding instead of two way.
         * Defaults to ["!", "-"]
         * @property
         * @type Array
         */
        bindingOperators: bindingOperators,

        /**
         * Applies data bindings between a model and the dom.
         * @param {Object} viewModel The model or viewmodel to bind to a dom element and its children.
         * @param {Object} element (Optional) The dom element to bind to. Defaults to document.body.
         * @param {Object} parentContext (Optional) For internal use. The context of the parents bindings. Used by the foreach binder.
         */
        applyBindings: function (viewModel, element, parentContext)
        {
            var context = {
                root: viewModel,
                data: viewModel,
                parents: parentContext ? parentContext.parents.slice(0) : []
            };

            if (parentContext && parentContext.data) {
                context.parents.push(parentContext.data);
            }

            bindElement(element || document.body, viewModel, context);
        },

        /**
         * Removes all data bindings from a dom element and its children.
         * @param {Object} element (Optional) The dom element to remove bindings from. Defaults to document.body.
         */
        removeBindings: function (element)
        {
            unbindElement(element || document.body);
        }
    };

    // Binders need access to the databind object
    databindings.databind = databind;

    return databind;
});