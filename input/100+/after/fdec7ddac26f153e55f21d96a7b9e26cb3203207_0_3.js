function (
            CesiumWidget,
            parser,
            dom,
            domClass,
            domConstruct,
            ioQuery,
            fx,
            win,
            xhr,
            registry,
            ContentPane
    ) {
        "use strict";
        parser.parse();
        window.CesiumWidget = CesiumWidget; // for autocomplete.
        fx.fadeOut({ node: 'loading', onEnd: function () {
            domConstruct.destroy('loading');
        }}).play();

        var logOutput = document.getElementById('logOutput');
        function appendConsole(className, message) {
            var ele = document.createElement('span');
            ele.className = className;
            ele.textContent = message + "\n";
            logOutput.appendChild(ele);
            logOutput.parentNode.scrollTop = logOutput.clientHeight + 8 - logOutput.parentNode.clientHeight;
        }

        // NOTE: BlobBuilder will eventually be deprecated and replaced with a direct constructor on Blob itself.
        // https://developer.mozilla.org/en/DOM/Blob
        var BlobBuilder = BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
        var getURL = window.URL || window.webkitURL || window;
        if (typeof BlobBuilder === 'undefined') {
            registry.byId('buttonSaveAs').set('disabled', true);
        }

        var jsEditor;
        var htmlEditor;
        var suggestButton = registry.byId('buttonSuggest');
        var docTimer;
        var docTabs = {};
        var cesiumContainer = registry.byId('cesiumContainer');
        var docNode = dom.byId('docPopup');
        var docMessage = dom.byId('docPopupMessage');
        var local = { 'docTypes': [],  'headers': "<html><head></head><body>"};
        var errorLines = [];

        xhr.get({
            url: '../../Build/Documentation/types.txt',
            handleAs: 'json',
            error: function(error) {
                // Quiet for now, because the console will be cleared soon after this.
                // We'll let the user know about this error further down.
            }
        }).then(function (value) {
            local.docTypes = value;
        });

        xhr.get({
            url: 'templates/bucket.html',
            handleAs: 'text'
        }).then(function (value) {
            var pos = value.indexOf('<body');
            pos = value.indexOf('>', pos);
            local.headers = value.substring(0, pos + 1) + '\n';
        });

        function openDocTab(title, link) {
            if (typeof docTabs[title] === 'undefined') {
                docTabs[title] = new ContentPane({
                    title: title,
                    focused: true,
                    content: '<iframe class="fullFrame" src="' + link + '"></iframe>',
                    closable: true,
                    onClose: function () {
                        docTabs[this.title] = undefined;
                        // Return true to close the tab.
                        return true;
                    }
                }).placeAt(cesiumContainer);
                // After the iframe loads, re-scroll to selected field.
                docTabs[title].domNode.childNodes[0].onload = function () {
                    this.onload = function () {};
                    this.src = link;
                };
                cesiumContainer.selectChild(docTabs[title]);
            } else {
                // Tab already exists, but maybe not visible.  FireFox needs the tab to
                // be revealed before a re-scroll can happen.  Chrome works either way.
                cesiumContainer.selectChild(docTabs[title]);
                docTabs[title].domNode.childNodes[0].src = link;
            }
        }

        function showDocPopup () {
            var selectedText = jsEditor.getSelection();

            var onDocClick = function () {
                openDocTab(this.textContent, this.href);
                return false;
            };

            if (selectedText && selectedText in local.docTypes && typeof local.docTypes[selectedText].push === 'function') {
                var member, ele, i, len = local.docTypes[selectedText].length;
                docMessage.innerHTML = '';
                for (i = 0; i < len; ++i) {
                    member = local.docTypes[selectedText][i];
                    ele = document.createElement('a');
                    ele.target = "_blank";
                    ele.textContent = member.replace('.html', '').replace('module-', '').replace('#', '.');
                    ele.href = '../../Build/Documentation/' + member;
                    ele.onclick = onDocClick;
                    docMessage.appendChild(ele);
                }
                jsEditor.addWidget(jsEditor.getCursor(true), docNode);
                docNode.style.top = (parseInt(docNode.style.top, 10) - 5) + 'px';
            }
        }

        function onCursorActivity() {
            docNode.style.left = "-999px";
            if (typeof docTimer !== 'undefined') {
                window.clearTimeout(docTimer);
            }
            docTimer = window.setTimeout(showDocPopup, 500);
        }

        var bucketFrame = document.getElementById('bucketFrame');
        var bucketPane = registry.byId('bucketPane');

        function clearAllErrors(cm) {
            var line;
            while (errorLines.length > 0) {
                line = errorLines.pop();
                cm.setLineClass(line, null);
                cm.clearMarker(line);
            }
        }

        CodeMirror.commands.runCesium = function(cm) {
            clearAllErrors(cm);
            cesiumContainer.selectChild(bucketPane);
            bucketFrame.contentWindow.location.reload();
        };

        CodeMirror.commands.autocomplete = function(cm) {
            CodeMirror.simpleHint(cm, CodeMirror.cesiumHint);
        };

        jsEditor = CodeMirror.fromTextArea(document.getElementById("code"), {
            mode: "javascript",
            lineNumbers: true,
            matchBrackets: true,
            indentUnit: 4,
            extraKeys: {"Ctrl-Space": "autocomplete", "F9": "runCesium"},
            onCursorActivity: onCursorActivity,
            onChange: clearAllErrors
        });

        htmlEditor = CodeMirror.fromTextArea(document.getElementById("htmlBody"), {
            mode: "text/html",
            lineNumbers: true,
            matchBrackets: true,
            indentUnit: 4,
            extraKeys: {"F9": "runCesium"}
        });

        function loadFromGallery(link) {
            xhr.get({
                url: 'gallery/' + link,
                handleAs: 'text',
                error: function(error) {
                    appendConsole('consoleError', error);
                }
            }).then(function (value) {
                var pos = value.indexOf('<body');
                pos = value.indexOf('>', pos);
                var body = value.substring(pos + 2);
                pos = body.indexOf('<script id="cesium_sandcastle_script">');
                var pos2 = body.lastIndexOf('</script>');
                if ((pos <= 0) || (pos2 <= pos)) {
                    var ele = document.createElement('span');
                    ele.className = 'consoleError';
                    ele.textContent = 'Error reading source file: ' + link + '\n';
                    appendConsole(ele);
                } else {
                    var script = body.substring(pos + 38, pos2 - 1);
                    while (script.charAt(0) < 32) {
                        script = script.substring(1);
                    }
                    jsEditor.setValue(script);
                    htmlEditor.setValue(body.substring(0, pos - 1));
                    CodeMirror.commands.runCesium(jsEditor);
                }
            });
        }

        var queryObject = {};
        if (window.location.search) {
            queryObject = ioQuery.queryToObject(window.location.search.substring(1));
        }

        // The iframe (bucket.html) sends this message on load.
        // This triggers the code to be injected into the iframe.
        window.addEventListener('message', function (e) {
            var line;
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
                if (typeof e.data.lineNumber !== 'undefined') {
                    line = jsEditor.setMarker(e.data.lineNumber - 1, '<abbr title="' + e.data.rawErrorMsg + '">' + e.data.lineNumber + '</abbr>', "errorMarker");
                    jsEditor.setLineClass(line, "errorLine");
                    errorLines.push(line);
                }
            }
        }, true);

        registry.byId('jsContainer').on('show', function () {
            suggestButton.set('disabled', false);
            jsEditor.refresh();
        });

        registry.byId('htmlContainer').on('show', function () {
            suggestButton.set('disabled', true);
            htmlEditor.refresh();
        });

        // Clicking the 'Run' button simply reloads the iframe.
        registry.byId('buttonRun').on('click', function () {
            CodeMirror.commands.runCesium(jsEditor);
        });

        registry.byId('buttonSuggest').on('click', function () {
            CodeMirror.commands.autocomplete(jsEditor);
        });

        registry.byId('dropDownSaveAs').on('show', function () {
            var html = local.headers + htmlEditor.getValue() +
                '\n<script id="cesium_sandcastle_script">\n' + jsEditor.getValue() +
                '\n</script>\n</body>\n</html>\n';

            var octetBB = new BlobBuilder();
            octetBB.append(html);
            var octetBlob = octetBB.getBlob("application/octet-stream");
            var octetBlobURL = getURL.createObjectURL(octetBlob);
            dom.byId('saveAsFile').href = octetBlobURL;

            var baseHref = window.location.href, pos = baseHref.lastIndexOf('/');
            baseHref = baseHref.substring(0, pos) + '/gallery/';
            html = html.replace('<head>', '<head>\n    <base href="' + baseHref + '">');
            var htmlBB = new BlobBuilder();
            htmlBB.append(html);
            var htmlBlob = htmlBB.getBlob("text/html;charset=utf-8");
            var htmlBlobURL = getURL.createObjectURL(htmlBlob);
            dom.byId('saveAsNewWindow').href = htmlBlobURL;
        });

        registry.byId('buttonThumbnail').on('change', function (newValue) {
            if (newValue) {
                domClass.add('bucketFrame', 'makeThumbnail');
            } else {
                domClass.remove('bucketFrame', 'makeThumbnail');
            }
        });
    }