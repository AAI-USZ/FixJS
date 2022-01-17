function () {
		var buttons = ["OK", "Hello", "World"],
            settings = {title : "Dialog", size : blackberry.ui.dialog.SIZE_LARGE, position : blackberry.ui.dialog.CENTER, global: true},
            callback = jasmine.createSpy();

        blackberry.ui.dialog.customAskAsync("Click the button, this dialog is not a global dialog and should have three buttons and should be a global dialog, click the pass button to proceed", buttons, dialogCallback, settings);
        
        waitsFor(function () {
            return checkForCallback(callback);
        }, "dialog callback was never called", 10000);
    }