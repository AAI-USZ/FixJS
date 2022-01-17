function open() {
        var doc = _getCurrentDocument();
        var browserStarted = false;
        var retryCount = 0;
        
        function showWrongDocError() {
            Dialogs.showModalDialog(
                Dialogs.DIALOG_ID_ERROR,
                Strings.LIVE_DEVELOPMENT_ERROR_TITLE,
                Strings.LIVE_DEV_NEED_HTML_MESSAGE
            );
        }
                
        if (!doc || !doc.root) {
            showWrongDocError();
            
        } else {
            // For Sprint 6, we only open live development connections for HTML files
            // FUTURE: Remove this test when we support opening connections for different
            // file types.
            if (!doc.extension || doc.extension.indexOf("htm") !== 0) {
                showWrongDocError();
                return;
            }
            
            _setStatus(1);
            Inspector.connectToURL(doc.root.url).fail(function onConnectFail(err) {
                if (err === "CANCEL") {
                    return;
                }
                if (retryCount > 6) {
                    _setStatus(-1);
                    Dialogs.showModalDialog(
                        Dialogs.DIALOG_ID_LIVE_DEVELOPMENT,
                        Strings.LIVE_DEVELOPMENT_ERROR_TITLE,
                        Strings.LIVE_DEVELOPMENT_ERROR_MESSAGE
                    ).done(function (id) {
                        if (id === Dialogs.DIALOG_BTN_OK) {
                            // User has chosen to reload Chrome, quit the running instance
                            _setStatus(0);
                            NativeApp.closeLiveBrowser()
                                .done(function () {
                                    browserStarted = false;
                                    window.setTimeout(open);
                                })
                                .fail(function (err) {
                                    // Report error?
                                    _setStatus(-1);
                                    browserStarted = false;
                                });
                        }
                    });
                    return;
                }
                retryCount++;
                
                if (!browserStarted && exports.status !== -1) {
                    // If err === FileError.ERR_NOT_FOUND, it means a remote debugger connection
                    // is available, but the requested URL is not loaded in the browser. In that
                    // case we want to launch the live browser (to open the url in a new tab)
                    // without using the --remote-debugging-port flag. This works around issues
                    // on Windows where Chrome can't be opened more than once with the
                    // --remote-debugging-port flag set.
                    NativeApp.openLiveBrowser(
                        doc.root.url,
                        err !== FileError.ERR_NOT_FOUND
                    )
                        .done(function () {
                            browserStarted = true;
                        })
                        .fail(function (err) {
                            var message;
                            
                            _setStatus(-1);
                            if (err === FileError.NOT_FOUND_ERR) {
                                message = Strings.ERROR_CANT_FIND_CHROME;
                            } else {
                                message = StringUtils.format(Strings.ERROR_LAUNCHING_BROWSER, err);
                            }
                            
                            Dialogs.showModalDialog(
                                Dialogs.DIALOG_ID_ERROR,
                                Strings.ERROR_LAUNCHING_BROWSER_TITLE,
                                message
                            );
                        });
                }
                
                if (exports.status !== -1) {
                    window.setTimeout(function retryConnect() {
                        Inspector.connectToURL(doc.root.url).fail(onConnectFail);
                    }, 500);
                }
            });
        }
    }