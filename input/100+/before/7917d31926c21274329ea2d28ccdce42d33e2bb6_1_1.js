function Editor(document, makeMasterEditor, mode, container, additionalKeys, range) {
        var self = this;
        
        _instances.push(this);
        
        // Attach to document: add ref & handlers
        this.document = document;
        document.addRef();
        
        if (range) {    // attach this first: want range updated before we process a change
            this._visibleRange = new TextRange(document, range.startLine, range.endLine);
        }
        
        // store this-bound version of listeners so we can remove them later
        this._handleDocumentChange = this._handleDocumentChange.bind(this);
        this._handleDocumentDeleted = this._handleDocumentDeleted.bind(this);
        $(document).on("change", this._handleDocumentChange);
        $(document).on("deleted", this._handleDocumentDeleted);
        
        // (if makeMasterEditor, we attach the Doc back to ourselves below once we're fully initialized)
        
        this._inlineWidgets = [];
        
        // Editor supplies some standard keyboard behavior extensions of its own
        var codeMirrorKeyMap = {
            "Tab": _handleTabKey,
            "Shift-Tab": "indentLess",

            "Left": function (instance) {
                if (!_handleSoftTabNavigation(instance, -1, "moveH")) {
                    CodeMirror.commands.goCharLeft(instance);
                }
            },
            "Right": function (instance) {
                if (!_handleSoftTabNavigation(instance, 1, "moveH")) {
                    CodeMirror.commands.goCharRight(instance);
                }
            },
            "Backspace": function (instance) {
                if (!_handleSoftTabNavigation(instance, -1, "deleteH")) {
                    CodeMirror.commands.delCharLeft(instance);
                }
            },
            "Delete": function (instance) {
                if (!_handleSoftTabNavigation(instance, 1, "deleteH")) {
                    CodeMirror.commands.delCharRight(instance);
                }
            },
            "Shift-Delete": "cut",
            "Ctrl-Insert": "copy",
            "Shift-Insert": "paste"
        };
        
        EditorManager.mergeExtraKeys(self, codeMirrorKeyMap, additionalKeys);
        
        // We'd like null/"" to mean plain text mode. CodeMirror defaults to plaintext for any
        // unrecognized mode, but it complains on the console in that fallback case: so, convert
        // here so we're always explicit, avoiding console noise.
        if (!mode) {
            mode = "text/plain";
        }
        
        // Create the CodeMirror instance
        // (note: CodeMirror doesn't actually require using 'new', but jslint complains without it)
        this._codeMirror = new CodeMirror(container, {
            electricChars: false,   // we use our own impl of this to avoid CodeMirror bugs; see _checkElectricChars()
            indentUnit: 4,
            indentWithTabs: _useTabChar,
            lineNumbers: true,
            matchBrackets: true,
            dragDrop: false,    // work around issue #1123
            extraKeys: codeMirrorKeyMap
        });
        
        this._installEditorListeners();
        
        $(this)
            .on("keyEvent", _checkElectricChars)
            .on("change", this._handleEditorChange.bind(this));
        
        // Set code-coloring mode BEFORE populating with text, to avoid a flash of uncolored text
        this._codeMirror.setOption("mode", mode);
        
        // Initially populate with text. This will send a spurious change event, so need to make
        // sure this is understood as a 'sync from document' case, not a genuine edit
        this._duringSync = true;
        this._resetText(document.getText());
        this._duringSync = false;
        
        if (range) {
            // Hide all lines other than those we want to show. We do this rather than trimming the
            // text itself so that the editor still shows accurate line numbers.
            this._codeMirror.operation(function () {
                var i;
                for (i = 0; i < range.startLine; i++) {
                    self._hideLine(i);
                }
                var lineCount = self.lineCount();
                for (i = range.endLine + 1; i < lineCount; i++) {
                    self._hideLine(i);
                }
            });
            this.setCursorPos(range.startLine, 0);
        }

        // Now that we're fully initialized, we can point the document back at us if needed
        if (makeMasterEditor) {
            document._makeEditable(this);
        }
        
        // Add scrollTop property to this object for the scroll shadow code to use
        Object.defineProperty(this, "scrollTop", {
            get: function () {
                return this._codeMirror.scrollPos().y;
            }
        });
    }