function(require, mTextView, mKeyBinding, mTextStyler, mTextMateStyler, mHtmlGrammar, mEditor, mEditorFeatures, mContentAssist, mJSContentAssist, mCSSContentAssist){
	
	var editorDomNode = document.getElementById("orion");
	
	var textViewFactory = function() {
		return new mTextView.TextView({
			parent: editorDomNode,
			tabSize: 4
		});
	};

	var contentAssist;
	var contentAssistFactory = {
		createContentAssistMode: function(editor) {
			contentAssist = new mContentAssist.ContentAssist(editor.getTextView());
			var contentAssistWidget = new mContentAssist.ContentAssistWidget(contentAssist, "contentassist");
			return new mContentAssist.ContentAssistMode(contentAssist, contentAssistWidget);
		}
	};
	var cssContentAssistProvider = new mCSSContentAssist.CssContentAssistProvider();
	var jsContentAssistProvider = new mJSContentAssist.JavaScriptContentAssistProvider();
	
	// Canned highlighters for js, java, and css. Grammar-based highlighter for html
	var syntaxHighlighter = {
		styler: null, 
		
		highlight: function(fileName, editor) {
			if (this.styler) {
				this.styler.destroy();
				this.styler = null;
			}
			if (fileName) {
				var splits = fileName.split(".");
				var extension = splits.pop().toLowerCase();
				var textView = editor.getTextView();
				var annotationModel = editor.getAnnotationModel();
				if (splits.length > 0) {
					switch(extension) {
						case "js":
						case "java":
						case "css":
							this.styler = new mTextStyler.TextStyler(textView, extension, annotationModel);
							break;
						case "html":
							this.styler = new mTextMateStyler.TextMateStyler(textView, new mHtmlGrammar.HtmlGrammar());
							break;
					}
				}
			}
		}
	};
	
	var annotationFactory = new mEditorFeatures.AnnotationFactory();

	function save(editor) {
		editor.setInput(null, null, null, true);
		window.alert("Save hook.");
	}
	
	var keyBindingFactory = function(editor, keyModeStack, undoStack, contentAssist) {
		
		// Create keybindings for generic editing
		var genericBindings = new mEditorFeatures.TextActions(editor, undoStack);
		keyModeStack.push(genericBindings);
		
		// create keybindings for source editing
		var codeBindings = new mEditorFeatures.SourceCodeActions(editor, undoStack, contentAssist);
		keyModeStack.push(codeBindings);
		
		// save binding
		editor.getTextView().setKeyBinding(new mKeyBinding.KeyBinding("s", true), "save");
		editor.getTextView().setAction("save", function(){
				save(editor);
				return true;
		});
		
		// speaking of save...
		document.getElementById("save").onclick = function() {save(editor);};

	};
		
	var dirtyIndicator = "";
	var status = "";
	
	var statusReporter = function(message, isError) {
		if (isError) {
			status =  "ERROR: " + message;
		} else {
			status = message;
		}
		document.getElementById("status").innerHTML = dirtyIndicator + status;
	};
	
	var editor = new mEditor.Editor({
		textViewFactory: textViewFactory,
		undoStackFactory: new mEditorFeatures.UndoFactory(),
		annotationFactory: annotationFactory,
		lineNumberRulerFactory: new mEditorFeatures.LineNumberRulerFactory(),
		contentAssistFactory: contentAssistFactory,
		keyBindingFactory: keyBindingFactory,
		statusReporter: statusReporter,
		domNode: editorDomNode
	});
		
	editor.addEventListener("DirtyChanged", function(evt) {
		if (editor.isDirty()) {
			dirtyIndicator = "*";
		} else {
			dirtyIndicator = "";
		}
		document.getElementById("status").innerHTML = dirtyIndicator + status;
	});
	
	editor.installTextView();
	// if there is a mechanism to change which file is being viewed, this code would be run each time it changed.
	
	var contentName = "sample.js";  // for example, a file name, something the user recognizes as the content.
	var initialContent = "// right click on a file in the Resources panel & select Open with Orion \nconsole.log('this is some javascript code');";

	/*var contentName = window.selectedRes;  // resource file name
	var initialContent = window.selectedContent; //resource content*/

	editor.setInput(contentName, null, initialContent); //placing name & content into editor
	//Put resource name & content into global variables
	syntaxHighlighter.highlight(contentName, editor);
	editor.highlightAnnotations();
	contentAssist.addEventListener("Activating", function() {
		if (/\.css$/.test(contentName)) {
			contentAssist.setProviders([cssContentAssistProvider]);
		} else if (/\.js$/.test(contentName)) {
			contentAssist.setProviders([jsContentAssistProvider]);
		}
	});
	// end of code to run when content changes.
	
	window.onbeforeunload = function() {
		if (editor.isDirty()) {
			return "There are unsaved changes.";
		}
	};

	return editor;
}