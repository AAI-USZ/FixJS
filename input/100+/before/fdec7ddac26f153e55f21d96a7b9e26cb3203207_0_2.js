function (e) {
            if (e.data === 'reload') {
                logOutput.innerHTML = "";
                if (typeof queryObject.src !== 'undefined') {
                    // This happens once on Sandcastle page load, the blank bucket.html triggers a load
                    // of the selected demo code from the gallery, followed by a Run (F9) equivalent.
                    loadFromGallery(queryObject.src);
                    queryObject.src = undefined;
                } else {
                    // This happens after a Run (F9) reloads bucket.html, to inject the editor code
                    // into the iframe, causing the demo to run there.
                    var bucketDoc = bucketFrame.contentDocument;
                    var bodyEle = bucketDoc.createElement('div');
                    bodyEle.innerHTML = htmlEditor.getValue();
                    bucketDoc.body.appendChild(bodyEle);
                    var jsEle = bucketDoc.createElement('script');
                    jsEle.type = 'text/javascript';
                    jsEle.textContent = jsEditor.getValue();
                    bucketDoc.body.appendChild(jsEle);
                    if (local.docTypes.length === 0) {
                        appendConsole('consoleError', "Documentation not available.  Please run the 'release' build script to generate Cesium documentation.");
                    }
                }
            } else if (typeof e.data.log !== 'undefined') {
                appendConsole('consoleLog', e.data.log);
            } else if (typeof e.data.error !== 'undefined') {
                appendConsole('consoleError', e.data.error);
            }
        }