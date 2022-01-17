function () {
            jqUnit.expect(1);
            var response = gpii.lifecycleManager.responseToSnapshot("org.gnome.desktop.a11y.magnifier", parseHandlerResponseFunctionRequest);
            jqUnit.assertDeepEq("parseHandlerResponse returning the correct payload", parseHandlerResponseFunctionExpectedResponse, response);
        }