function() {
            this.ninjaVersion = window.ninjaVersion.ninja.version;
            this.undoManager = document.application.undoManager = UndoManager.create();
            document.application.njUtils = NjUtils;
            document.application.model = this.appModel;
        }