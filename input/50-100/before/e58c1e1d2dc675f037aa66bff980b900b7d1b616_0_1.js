function clickDialogButton(buttonId) {
        runs(function () {
            // Make sure there's one and only one dialog open
            expect(testWindow.$(".modal.instance").length).toBe(1);
            
            // Make sure desired button exists
            var dismissButton = testWindow.$(".modal.instance .dialog-button[data-button-id='" + buttonId + "']");
            expect(dismissButton.length).toBe(1);
            
            dismissButton.click();
        });
        // Wait until dialog's result handler runs; it's done on a timeout to avoid Bootstrap bugs
        // TODO: add unit-test helper API to Dialogs that cleanly tell us when it's done closing
        waits(100);
    }