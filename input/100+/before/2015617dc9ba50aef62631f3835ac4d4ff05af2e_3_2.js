function () {

        // Ensure we have a proper context of the image to save
        if (!currentContext || !currentContext.isImage || !currentContext.src) {
            return;
        }

        // Check that the proper access permissions have been enabled
        if (config.permissions.indexOf("access_shared") === -1) {
            return;
        }

        var source     = currentContext.src,
            target     = "photos";

        function onSaved(target) {

            if (target) {
                var request = {
                    action: 'bb.action.VIEW',
                    type: utils.fileNameToMIME(target),
                    uri : "file:/" + target, //target comes back with double slash, change to triple
                    action_type: window.qnx.webplatform.getApplication().invocation.ACTION_TYPE_MENU,
                    target_type: window.qnx.webplatform.getApplication().invocation.TARGET_TYPE_ALL
                };

                /* TODO i18 internationalization */
                contextmenu.generateInvocationList(request, 'No image viewing applications installed');
            }
        }
        // Download the file over an RPC call to the controller, it will call our onSaved method to see if we succeeded
        window.qnx.webplatform.getController().remoteExec(1, 'webview.downloadSharedFile', [source, target], onSaved);
    }