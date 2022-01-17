function(value) {
                    // Prevent injection of illegal tags
                    if (typeof value === 'undefined' || value === 'na') {
                        return;
                    }

                    var editingElement = editor.getElement()[0];
                    var selectedElement = editor.getSelectedElements();
                    if (!editor.getSelectedHtml() || editor.getSelectedHtml() === '') {
                        // Do not attempt to modify editing element's tag
                        if ($(selectedElement)[0] === $(editingElement)[0]) {
                            return;
                        }
                        editor.saveSelection();
                        var replacementElement = $('<' + value + '>').html(selectedElement.html());
                        selectedElement.replaceWith(replacementElement);
                        editor.restoreSelection();
                    } else {
                        var selectedElementParent = $(editor.getSelectedElements()[0]).parent();
                        var temporaryClass = this.options.baseClass + '-selection';
                        var replacementHtml = $('<' + value + '>').html(editor.getSelectedHtml()).addClass(temporaryClass);

                        /*
                         * Replace selection if the selected element parent or the selected element is the editing element,
                         * instead of splitting the editing element.
                         */
                        if (selectedElementParent === editingElement
                            || editor.getSelectedElements()[0] === editingElement) {
                            editor.replaceSelection(replacementHtml);
                        } else {
                            editor.replaceSelectionWithinValidTags(replacementHtml, this.validParents);
                        }

                        editor.selectInner(editor.getElement().find('.' + temporaryClass).removeClass(temporaryClass));
                    }

                    editor.checkChange();
                }