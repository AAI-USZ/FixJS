function() {
            var selectedElement = $(this),
                    originalText = selectedElement.text(),
                    ellipsisApplied = false;

            // Check if we can safely remove the selected element. This saves a lot of unnecessary iterations.
            if (wrapperElement.innerHeight() - selectedElement.innerHeight() > containerElement.innerHeight()) {
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

                    // Iterate until wrapper element height is less than or equal to the container element height.
                    while (wrapperElement.innerHeight() > containerElement.height()) {
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
        }