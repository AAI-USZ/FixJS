function ellipsisOnElement(containerElement, settings) {
        var containerData = containerElement.data('jqae');
        if (!containerData) containerData = {};

        // Check if wrapper div was already created and bound to the container element.
        var wrapperElement = containerData.wrapperElement;

        // If not, create wrapper element.
        if (!wrapperElement) {
            wrapperElement = containerElement.wrapInner('<div/>').find('>div');
        }

        // Check if the original wrapper element content was already bound to the wrapper element.
        var wrapperElementData = wrapperElement.data('jqae');
        if (!wrapperElementData) wrapperElementData = {};

        var wrapperOriginalContent = wrapperElementData.originalContent;

        // If so, clone the original content, re-bind the original wrapper content to the clone, and replace the
        // wrapper with the clone.
        if (wrapperOriginalContent) {
            wrapperElement = wrapperElementData.originalContent.clone(true)
                    .data('jqae', {originalContent: wrapperOriginalContent}).replaceAll(wrapperElement);

        } else {
            // Otherwise, clone the current wrapper element and bind it as original content to the wrapper element.

            wrapperElement.data('jqae', {originalContent: wrapperElement.clone(true)});
        }

        // Bind the wrapper element and current container width and height to the container element. Current container
        // width and height are stored to detect changes to the container size.
        containerElement.data('jqae', {
            wrapperElement: wrapperElement,
            containerWidth: containerElement.width(),
            containerHeight: containerElement.height()
        });


        // Normally the ellipsis characters are applied to the last non-empty text-node in the selected element. If the
        // selected element becomes empty during ellipsis iteration, the ellipsis characters cannot be applied to that
        // selected element, and must be deferred to the previous selected element. This parameter keeps track of that.
        var deferAppendEllipsis = false;

        // Loop through all selected elements in reverse order.
        var selectedElements = wrapperElement;
        if (settings.selector) selectedElements = $(wrapperElement.find(settings.selector).get().reverse());

        selectedElements.each(function() {
            var selectedElement = $(this),
                    originalText = selectedElement.text(),
                    ellipsisApplied = false;

            // Check if we can safely remove the selected element. This saves a lot of unnecessary iterations. Add one
            // pixel allowance because of bug in height() calculation on max-height boxes ie iE.
            if (wrapperElement.height() - selectedElement.height() > containerElement.height() + 1) {
                selectedElement.remove();

            } else {
                // Reverse recursively remove empty elements, until the element that contains a non-empty text-node.
                removeLastEmptyElements(selectedElement);

                // If the selected element has not become empty, start ellipsis iterations on the selected element.
                if (selectedElement.contents().length) {

                    // If a deffered ellipsis is still pending, apply it now to the last text-node.
                    if (deferAppendEllipsis) {
                        getLastTextNode(selectedElement).get(0).nodeValue += settings.ellipsis;
                        deferAppendEllipsis = false;
                    }

                    // Iterate until wrapper element height is less than or equal to the container element height. Add one
                    // pixel allowance because of bug in height() calculation on max-height boxes in IE.
                    while (wrapperElement.height() > containerElement.height() + 1) {
                        // Apply ellipsis on last text node, by removing one word.
                        ellipsisApplied = ellipsisOnLastTextNode(selectedElement);

                        // If ellipsis was succesfully applied, remove any remaining empty last elements and append the
                        // ellipsis characters.
                        if (ellipsisApplied) {
                            removeLastEmptyElements(selectedElement);

                            // If the selected element is not empty, append the ellipsis characters.
                            if (selectedElement.contents().length) {
                                getLastTextNode(selectedElement).get(0).nodeValue += settings.ellipsis;

                            } else {
                                // If the selected element has become empty, defer the appending of the ellipsis characters
                                // to the previous selected element.
                                deferAppendEllipsis = true;
                                selectedElement.remove();
                                break;
                            }

                        } else {
                            // If ellipsis could not be applied, defer the appending of the ellipsis characters to the
                            // previous selected element.
                            deferAppendEllipsis = true;
                            selectedElement.remove();
                            break;
                        }
                    }

                    // If the "setTitle" property is set to "onEllipsis" and the ellipsis has been applied, or if the
                    // property is set to "always", the add the "title" attribute with the original text. Else remove the
                    // "title" attribute. When the "setTitle" property is set to "never" we do not touch the "title"
                    // attribute.
                    if (((settings.setTitle == 'onEllipsis') && ellipsisApplied) || (settings.setTitle == 'always')) {
                        selectedElement.attr('title', originalText);

                    } else if (settings.setTitle != 'never') {
                        selectedElement.removeAttr('title');
                    }
                }
            }
        });
    }