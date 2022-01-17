function clickDialogButton(buttonId) {
        // Make sure there's one and only one dialog open
        var $dlg = testWindow.$(".modal.instance"),
            promise = $dlg.data("promise");
        
        expect($dlg.length).toBe(1);
        
        // Make sure desired button exists
        var dismissButton = $dlg.find(".dialog-button[data-button-id='" + buttonId + "']");
        expect(dismissButton.length).toBe(1);
        
        // Click the button
        dismissButton.click();

        // Dialog should resolve/reject the promise
        waitsForDone(promise);
    }