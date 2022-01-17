function () {
		var buttons = ["Hello", "World"],
            settings = {title : "Dialog", size : blackberry.ui.dialog.SIZE_LARGE, position : blackberry.ui.dialog.CENTER},
            callback = jasmine.createSpy();

        blackberry.ui.dialog.customAskAsync("Click the button, this dialog is not a global dialog and should have two buttons, click the pass button to proceed", buttons, dialogCallback, settings);
        
        waitsFor(function () {
            return checkForCallback(callback);
        }, "dialog callback was never called", 10000);
    }