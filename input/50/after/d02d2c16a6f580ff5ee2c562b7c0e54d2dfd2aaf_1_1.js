function () {
            jqUnit.expect(1);
            var response = gpii.lifecycleManager.responseToSnapshot("org.gnome.desktop.interface", parseHandlerResponseFunctionRequestNoSettings);
            jqUnit.assertUndefined("parseHandlerResponse returning the correct payload", response);
        }