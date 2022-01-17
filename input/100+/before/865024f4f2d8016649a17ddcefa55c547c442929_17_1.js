function() {
            var el = this.element;

            el.classList.add('montage-editor-container');

            el.addEventListener("focus", this, true);
            el.addEventListener("dragstart", this, false);
            el.addEventListener("dragenter", this, false);
            el.addEventListener("dragover", this, false);
            el.addEventListener("drop", this, false);
            el.addEventListener("dragend", this, false);

             // Setup the sanitizer if not specified
            if (this._sanitizer === undefined) {
                this._sanitizer = Sanitizer.create();
            }

            // Setup the undoManager if not specified
            if (this._undoManager === undefined) {
                this._undoManager = defaultUndoManager;
            }

            // Initialize the overlays
            if (this._overlays === undefined) {
                // Install the default overlays
                this._overlays = [RichTextResizer.create(), RichTextLinkPopup.create()];
            }
            this._callOverlays("initWithEditor", this, true);
        }