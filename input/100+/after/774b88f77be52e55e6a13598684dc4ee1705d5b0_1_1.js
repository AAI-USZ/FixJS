function () {
            var requestObj = request.init(_webviewObj);

            _webviewObj.visible = true;
            _webviewObj.active = true;
            _webviewObj.zOrder = 0;
            _webviewObj.enableCrossSiteXHR = true;
            _webviewObj.setGeometry(0, CHROME_HEIGHT, screen.width, screen.height - CHROME_HEIGHT);

            window.qnx.webplatform.getApplication().windowVisible = true;

            _webviewObj.enableWebEventRedirect("ContextMenuRequestEvent", 3);
            _webviewObj.enableWebEventRedirect("ContextMenuCancelEvent", 3);
            _webviewObj.enableWebEventRedirect("PropertyCurrentContextEvent", 3);

            _webviewObj.onNetworkResourceRequested = requestObj.networkResourceRequestedHandler;

            if (ready && typeof ready === 'function') {
                ready();
            }
        }