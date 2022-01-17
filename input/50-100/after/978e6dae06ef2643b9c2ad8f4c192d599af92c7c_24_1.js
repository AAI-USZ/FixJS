function () {
		var buttons = ["Ok"],
            settings = {title : "Dialog", size : blackberry.ui.dialog.SIZE_FULL, position : blackberry.ui.dialog.TOP},
            callback = jasmine.createSpy();

        blackberry.ui.dialog.customAskAsync("Click the button, this dialog is not a global dialog and should have one button", buttons, dialogCallback, settings);
        
        waitsFor(function () {
            return checkForCallback(callback);
        }, "dialog callback was never called", 10000);
    }