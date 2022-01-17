function _onDocumentChange() {
        var doc = _getCurrentDocument();
        if (!doc) {
            return;
        }
        
        if (Inspector.connected()) {
            if (agents.network && agents.network.wasURLRequested(doc.url)) {
                _closeDocument();
                var editor = EditorManager.getCurrentFullEditor();
                _openDocument(doc, editor);
            } else {
                /* FUTURE: support live connections for docments other than html */
                if (doc.extension && doc.extension.indexOf("htm") === 0 && doc.file.fullPath !== _htmlDocumentPath) {
                    close();
                    window.setTimeout(open);
                    _htmlDocumentPath = doc.file.fullPath;
                }
            }
        } else if (exports.config.autoconnect) {
            window.setTimeout(open);
        }
    }