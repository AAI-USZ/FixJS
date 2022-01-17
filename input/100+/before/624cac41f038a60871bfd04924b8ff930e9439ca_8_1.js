function(dialogContainer, openOptions) {
                var $dialogContainer = sakai_util.getJqueryObject(dialogContainer);

                var positionDialog = true;
                var positionOffset = false;
                var bindKeyboardFocus = true;
                var bindKeyboardFocusIgnoreElements = false;
                var bindKeyboardCloseFunction = false;

                if (openOptions) {
                    if (openOptions.positionDialog) {
                        positionDialog = openOptions.positionDialog;
                    }
                    positionOffset = openOptions.positionOffset;
                    if (openOptions.bindKeyboardFocus) {
                        bindKeyboardFocus = openOptions.bindKeyboardFocus;
                    }
                    bindKeyboardFocusIgnoreElements = openOptions.bindKeyboardFocusIgnoreElements;
                    bindKeyboardCloseFunction = openOptions.bindKeyboardCloseFunction;
                }

                if (positionDialog) {
                    sakai_util.Modal.positionDialogBox($dialogContainer, positionOffset);
                }
                if (bindKeyboardFocus) {
                    sakai_util.Modal.bindDialogFocus($dialogContainer, bindKeyboardFocusIgnoreElements, bindKeyboardCloseFunction);
                }

                $dialogContainer.jqmShow();
            }