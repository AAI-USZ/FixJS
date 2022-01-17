function(contents) {
                //editor.setValue(contents);
		editor.session.doc.setValue(contents);
		self.resize();
		editor.resize();
		editor.navigateFileStart();
		var UndoManager = require("ace/undomanager").UndoManager;
		editor.getSession().setUndoManager(new UndoManager());
            }