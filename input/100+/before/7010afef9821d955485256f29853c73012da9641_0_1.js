function(value) {
                    // Prevent injection of illegal tags
                    if (typeof value === 'undefined' || value === 'na') {
                        ui.change();
                        return;
                    }
                    editor.tagSelectionWithin(value, editor.getElement());
                }