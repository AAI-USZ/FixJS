f    {
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
