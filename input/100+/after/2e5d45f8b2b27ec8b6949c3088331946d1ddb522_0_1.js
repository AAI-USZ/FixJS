function to get called properly", function () {
        var currentContext = {
            url : 'testUrl',
            src : 'testSrc',
            isImage : true
        };

        // Set the access_shared permissions in a mocked way ;) //
        spyOn(config, "permissions").andReturn(['access_shared']);
        config.permissions.indexOf = function () {
                                                    return 1;
                                                };

        contextmenu.setCurrentContext(currentContext);
        contextmenu.saveImage();
        expect(mockedController.remoteExec).toHaveBeenCalledWith(1, 'webview.downloadSharedFile', ['testSrc', 'photos'], jasmine.any(Function));
    }