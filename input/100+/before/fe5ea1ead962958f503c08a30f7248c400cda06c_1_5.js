function (element, value, oldValue, viewModel, attributeName, info, metaData)
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