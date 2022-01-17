function(dialogContainer, ignoreElements, closeFunction) {
                var origFocus = $(':focus');
                var $dialogContainer = $(dialogContainer);

                var bindFunction = function(e) {
                    if ($dialogContainer.is(':visible') && $dialogContainer.has(':focus').length && e.which === $.ui.keyCode.ESCAPE) {
                        if ($.isFunction(closeFunction)) {
                            closeFunction();
                        } else {
                            $dialogContainer.jqmHide();
                        }
                        origFocus.focus();
                    } else if ($dialogContainer.is(':visible') && e.which === $.ui.keyCode.TAB) {
                        // determine which elements are keyboard navigable
                        var $focusable = $('a:visible, input:visible, button:visible:not(:disabled), textarea:visible', $dialogContainer);
                        if (ignoreElements) {
                            $focusable = $focusable.not(ignoreElements);
                        }
                        var $focused = $(':focus');
                        var index = $focusable.index($focused);
                        if (e.shiftKey && $focusable.length && (index === 0)) {
                            // if shift tabbing from the start of the dialog box, shift focus to the last element
                            $focusable.last().focus();
                            return false;
                        } else if (!e.shiftKey && $focusable.length && (index === $focusable.length - 1)) {
                            // if tabbing from the end of the dialog box, shift focus to the first element
                            $focusable.first().focus();
                            return false;
                        }
                    }
                };
                $(dialogContainer).off('keydown');
                $(dialogContainer).keydown(bindFunction);
            }