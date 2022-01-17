function clickDialogButton(buttonId) {
        runs(function () {
            // Make sure there's one and only one dialog open
            expect(testWindow.$(".modal.instance").length).toBe(1);
            
            // Make sure desired button exists
            var dismissButton = testWindow.$(".modal.instance .dialog-button[data-button-id='" + buttonId + "']");
            expect(dismissButton.length).toBe(1);
            
            dismissButton.click();
        });
    }