function showModalDialog(dlgClass, title, message) {
        var result = $.Deferred(),
            promise = result.promise();
        
        // We clone the HTML rather than using it directly so that if two dialogs of the same
        // type happen to show up, they can appear at the same time. (This is an edge case that
        // shouldn't happen often, but we can't prevent it from happening since everything is
        // asynchronous.)
        var $dlg = $("." + dlgClass + ".template")
            .clone()
            .removeClass("template")
            .addClass("instance")
            .appendTo(window.document.body);
        
        if ($dlg.length === 0) {
            throw new Error("Dialog id " + dlgClass + " does not exist");
        }

        // Save the dialog promise for unit tests
        $dlg.data("promise", promise);

        // Set title and message
        if (title) {
            $(".dialog-title", $dlg).html(title);
        }
        if (message) {
            $(".dialog-message", $dlg).html(message);
        }

        var handleKeyDown = _handleKeyDown.bind($dlg);

        // Pipe dialog-closing notification back to client code
        $dlg.one("hidden", function () {
            var buttonId = $dlg.data("buttonId");
            if (!buttonId) {    // buttonId will be undefined if closed via Bootstrap's "x" button
                buttonId = DIALOG_BTN_CANCEL;
            }
            
            // Let call stack return before notifying that dialog has closed; this avoids issue #191
            // if the handler we're triggering might show another dialog (as long as there's no
            // fade-out animation)
            window.setTimeout(function () {
                result.resolve(buttonId);
            }, 0);
            
            // Remove the dialog instance from the DOM.
            $dlg.remove();

            // Remove keydown event handler
            window.document.body.removeEventListener("keydown", handleKeyDown, true);
            KeyBindingManager.setEnabled(true);
        }).one("shown", function () {
            // Set focus to the default button
            var primaryBtn = $dlg.find(".primary");

            if (primaryBtn) {
                primaryBtn.focus();
            }

            // Listen for dialog keyboard shortcuts
            window.document.body.addEventListener("keydown", handleKeyDown, true);
            KeyBindingManager.setEnabled(false);
        });
        
        // Click handler for buttons
        $dlg.one("click", ".dialog-button", function (e) {
            _dismissDialog($dlg, $(this).attr("data-button-id"));
        });

        // Run the dialog
        $dlg.modal({
            backdrop: "static",
            show: true,
            keyboard: true
        });

        return promise;
    }