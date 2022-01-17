function(textarea, options) {
console.log("Creating new wysiwig area");
    var self = this;
    var editorMode = TracWysiwyg.getEditorMode();

    this.autolink = true;
    this.textarea = textarea;
    this.options = options = options || {};
    var wikitextToolbar = null;
    var textareaResizable = null;
    if (/\btrac-resizable\b/i.test(textarea.className)) {
        var tmp = textarea.parentNode;
        tmp = tmp && tmp.parentNode;
        if (tmp && /\btrac-resizable\b/i.test(tmp.className)) {
            wikitextToolbar = tmp.previousSibling;
            textareaResizable = tmp;
        }
    }
    else {
        wikitextToolbar = textarea.previousSibling;
    }
    if (wikitextToolbar && (wikitextToolbar.nodeType != 1 || wikitextToolbar.className != "wikitoolbar")) {
        wikitextToolbar = null;
    }
    this.textareaResizable = textareaResizable;
    this.wikitextToolbar = wikitextToolbar;

    this.createEditable(document, textarea, textareaResizable);
    var frame = this.frame;
    var resizable = this.resizable;

    this.contentWindow = frame.contentWindow;
    this.contentDocument = this.contentWindow.document;

    this.initializeEditor(this.contentDocument);
    this.wysiwygToolbar = this.createWysiwygToolbar(document);
    this.styleMenu = this.createStyleMenu(document);
    this.decorationMenu = this.createDecorationMenu(document);
    this.tableMenu = this.createTableMenu(document);
    this.menus = [ this.styleMenu, this.decorationMenu, this.tableMenu ];
    this.toolbarButtons = this.setupMenuEvents();
    this.toggleEditorButtons = null;
    this.autolinkButton = null;
    this.savedWysiwygHTML = null;

    this.setupToggleEditorButtons();
    this.setupSyncTextAreaHeight();

    var styleStatic = { position: "static", left: "-9999px", top: "-9999px" };
    var styleAbsolute = { position: "absolute", left: "-9999px", top: "-9999px" };
    switch (editorMode) {
    case "textarea":
        TracWysiwyg.setStyle(textareaResizable || textarea, styleStatic);
        if (wikitextToolbar) {
            TracWysiwyg.setStyle(wikitextToolbar, styleStatic);
        }
        TracWysiwyg.setStyle(resizable || frame, { position: "absolute",
            left: "-9999px", top: TracWysiwyg.elementPosition(textareaResizable || textarea).top + "px" });
        TracWysiwyg.setStyle(this.wysiwygToolbar, styleAbsolute);
        TracWysiwyg.setStyle(this.autolinkButton.parentNode, { display: "none" });
        textarea.setAttribute("tabIndex", "");
        frame.setAttribute("tabIndex", "-1");
        break;
    case "wysiwyg":
        TracWysiwyg.setStyle(textareaResizable || textarea, { position: "absolute",
            left: "-9999px", top: TracWysiwyg.elementPosition(textareaResizable || textarea).top + "px" });
        if (wikitextToolbar) {
            TracWysiwyg.setStyle(wikitextToolbar, styleAbsolute);
        }
        TracWysiwyg.setStyle(resizable || frame, styleStatic);
        TracWysiwyg.setStyle(this.wysiwygToolbar, styleStatic);
        TracWysiwyg.setStyle(this.autolinkButton.parentNode, { display: "" });
        textarea.setAttribute("tabIndex", "-1");
        frame.setAttribute("tabIndex", "");
        break;
    }

    var body = document.body;
    for (var i = 0; i < this.menus.length; i++) {
        body.insertBefore(this.menus[i], body.firstChild);
    }
    var element = wikitextToolbar || textareaResizable || textarea;
console.log("Insering edit buttons");
    element.parentNode.insertBefore(this.toggleEditorButtons, element);
    element.parentNode.insertBefore(this.wysiwygToolbar, element);

    function lazySetup() {
        if (self.contentDocument.body) {
            var exception;
            try { self.execCommand("useCSS", false); } catch (e) { }
            try { self.execCommand("styleWithCSS", false); } catch (e) { }
            if (editorMode == "wysiwyg") {
                try { self.loadWysiwygDocument() } catch (e) { exception = e }
            }
            self.setupEditorEvents();
            self.setupFormEvent();
            if (exception) {
                (self.textareaResizable || self.textarea).style.position = "static";
                if (self.wikitextToolbar) {
                    self.wikitextToolbar.style.position = "static";
                }
                (self.resizable || self.frame).style.position = self.wysiwygToolbar.style.position = "absolute";
                self.autolinkButton.parentNode.style.display = "none";
                alert("Failed to activate the wysiwyg editor.");
                throw exception;
            }
        }
        else {
            setTimeout(lazySetup, 100);
        }
    }
    lazySetup();
}