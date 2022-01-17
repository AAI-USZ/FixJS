function(Obj, Firebug, Events, Menu, Dom, Locale, Css) {

// ********************************************************************************************* //
// Constants

var Cc = Components.classes;
var Ci = Components.interfaces;
var Cu = Components.utils;

var MODE_JAVASCRIPT = "js";
var CONTEXT_MENU = "";
var TEXT_CHANGED = "";

try
{
    // Introduced in Firefox 8
    Cu["import"]("resource:///modules/source-editor.jsm");

    MODE_JAVASCRIPT = SourceEditor.MODES.JAVASCRIPT;
    CONTEXT_MENU = SourceEditor.EVENTS.CONTEXT_MENU;
    TEXT_CHANGED = SourceEditor.EVENTS.TEXT_CHANGED;
}
catch (err)
{
    if (FBTrace.DBG_ERRORS)
        FBTrace.sysout("commandEditor: EXCEPTION source-editors is not available!");
}

// ********************************************************************************************* //
// Command Editor

Firebug.CommandEditor = Obj.extend(Firebug.Module,
{
    dispatchName: "commandEditor",

    editor: null,

    initialize: function()
    {
        Firebug.Module.initialize.apply(this, arguments);

        if (this.editor)
            return;

        if (typeof(SourceEditor) != "undefined")
            this.editor = new SourceEditor();
        else
            this.editor = new TextEditor();

        var config =
        {
            mode: MODE_JAVASCRIPT,
            showLineNumbers: false,
            theme: "chrome://firebug/skin/orion-firebug.css"
        };

        // Custom shortcuts for Orion editor
        config.keys = [{
            action: "firebug-cmdEditor-execute",
            code: KeyEvent.DOM_VK_RETURN,
            accel: true,
            callback: this.onExecute.bind(this),
        },{
            action: "firebug-cmdEditor-escape",
            code: KeyEvent.DOM_VK_ESCAPE,
            callback: this.onEscape.bind(this),
        }];

        // Initialize Orion editor.
        this.parent = document.getElementById("fbCommandEditor");
        this.editor.init(this.parent, config, this.onEditorLoad.bind(this));

        if (FBTrace.DBG_COMMANDEDITOR)
            FBTrace.sysout("commandEditor: SourceEditor initialized");
    },

    shutdown: function()
    {
        if (!this.editor)
            return;

        this.editor.removeEventListener(CONTEXT_MENU, this.onContextMenu);
        this.editor.removeEventListener(TEXT_CHANGED, this.onTextChanged);

        this.editor.destroy();
        this.editor = null;
    },

    /**
     * The load event handler for the source editor. This method does post-load
     * editor initialization.
     */
    onEditorLoad: function()
    {
        // xxxHonza: Context menu support is going to change in SourceEditor
        this.editor.addEventListener(CONTEXT_MENU, this.onContextMenu);
        this.editor.addEventListener(TEXT_CHANGED, this.onTextChanged);

        this.editor.setCaretOffset(this.editor.getCharCount());

        Firebug.chrome.applyTextSize(Firebug.textSize);

        if (FBTrace.DBG_COMMANDEDITOR)
            FBTrace.sysout("commandEditor.onEditorLoad; SourceEditor loaded");
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Keyboard shortcuts

    onExecute: function()
    {
        var context = Firebug.currentContext;
        Firebug.CommandLine.update(context);
        Firebug.CommandLine.enter(context);
        return true;
    },

    onEscape: function()
    {
        var context = Firebug.currentContext;
        Firebug.CommandLine.update(context);
        Firebug.CommandLine.cancel(context);
        return true;
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Other Events

    onTextChanged: function(event)
    {
        // Ignore changes that are triggered by Firebug's restore logic.
        if (Firebug.CommandEditor.ignoreChanges)
            return;

        Firebug.CommandLine.onCommandLineInput(event);
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Context Menu

    onContextMenu: function(event)
    {
        var popup = document.getElementById("fbCommandEditorPopup");
        Dom.eraseNode(popup);

        var browserWindow = Firebug.chrome.window;
        var commandDispatcher = browserWindow.document.commandDispatcher;

        var items = Firebug.CommandEditor.getContextMenuItems();
        for (var i=0; i<items.length; i++)
            Menu.createMenuItem(popup, items[i]);

        if (!popup.childNodes.length)
            return;

        popup.openPopupAtScreen(event.screenX, event.screenY, true);
    },

    getContextMenuItems: function()
    {
        var items = [];
        items.push({label: Locale.$STR("Cut"), commandID: "cmd_cut"});
        items.push({label: Locale.$STR("Copy"), commandID: "cmd_copy"});
        items.push({label: Locale.$STR("Paste"), commandID: "cmd_paste"});
        items.push({label: Locale.$STR("Delete"), commandID: "cmd_delete"});
        items.push("-");
        items.push({label: Locale.$STR("SelectAll"), commandID: "cmd_selectAll"});
        return items;
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Public API

    setText: function(text)
    {
        try
        {
            // When manually setting the text, ignore the TEXT_CHANGED event.
            this.ignoreChanges = true;

            if (this.editor)
                this.editor.setText(text);
        }
        catch (err)
        {
            // No exception is really expected, we just need the finally clause.
        }
        finally
        {
            this.ignoreChanges = false;
        }
    },

    getText: function()
    {
        if (this.editor)
            return this.editor.getText();
    },

    setSelectionRange: function(start, end)
    {
        if (this.editor)
            this.editor.setSelection(start, end);
    },

    select: function()
    {
        // TODO xxxHonza
    },

    // returns the applicable commands
    getExpression: function()
    {
        if (this.editor)
        {
            if (this.isCollapsed())
                return this.getText();
            else
                return this.editor.getSelectedText();
        }
    },

    isCollapsed: function()
    {
        var selection;
        if (this.editor)
        {
            selection = this.editor.getSelection(); 
            return selection.start === selection.end;
        }
        return true;
    },

    hasFocus: function()
    {
        try
        {
            if (this.editor)
                return this.editor.hasFocus();
        }
        catch (e)
        {
        }
    },

    focus: function()
    {
        if (this.editor)
            this.editor.focus();
    },

    fontSizeAdjust: function(adjust)
    {
        if (!this.editor || !this.editor._view)
            return;

        if (typeof(SourceEditor) != "undefined")
        {
            var doc = this.editor._view._frame.contentDocument;

            // See issue 5488
            //doc.body.style.fontSizeAdjust = adjust;
        }
        else
        {
            this.editor.textBox.style.fontSizeAdjust = adjust;
        }
    }
});

// ********************************************************************************************* //
// Getters/setters

Firebug.CommandEditor.__defineGetter__("value", function()
{
    return this.getText();
});

Firebug.CommandEditor.__defineSetter__("value", function(val)
{
    this.setText(val);
});

// ********************************************************************************************* //
// Text Editor

/**
 * A simple <textbox> element is used in environments where the Orion SourceEditor is not
 * available (such as SeaMonkey)
 */
function TextEditor() {}
TextEditor.prototype =
{
    init: function(editorElement, config, callback)
    {
        var commandEditorBox = editorElement.parentNode;

        this.textBox = commandEditorBox.ownerDocument.createElement("textbox");
        this.textBox.setAttribute("id", "fbCommandEditor");
        this.textBox.setAttribute("multiline", "true");
        this.textBox.setAttribute("flex", "1");
        this.textBox.setAttribute("newlines", "pasteintact");
        this.textBox.setAttribute("label", "CommandEditor");

        commandEditorBox.replaceChild(this.textBox, editorElement);

        // The original source editor is also loaded asynchronously.
        setTimeout(callback);
    },

    destroy: function()
    {
    },

    addEventListener: function(type, callback)
    {
        if (!type)
            return;

        Events.addEventListener(this.textBox, type, callback, true);
    },

    removeEventListener: function(type, callback)
    {
        if (!type)
            return;

        Events.removeEventListener(this.textBox, type, callback, true);
    },

    setCaretOffset: function(offset)
    {
    },

    getCharCount: function()
    {
        return this.textBox.value ? this.textBox.value.length : 0;
    },

    setText: function(text)
    {
        this.textBox.value = text;
    },

    getText: function()
    {
        return this.textBox.value;
    },

    setSelection: function(start, end)
    {
        this.textBox.setSelectionRange(start, end);
    },

    getSelection: function()
    {
        return {
            start: this.textBox.selectionStart,
            end: this.textBox.selectionEnd
        };
    },

    hasFocus: function()
    {
        return this.textBox.getAttribute("focused") == "true";
    },

    focus: function()
    {
        this.textBox.focus();
    },

    getSelectedText: function()
    {
        var start = this.textBox.selectionStart;
        var end = this.textBox.selectionEnd;

        return this.textBox.value.substring(start, end);
    } 
}

// ********************************************************************************************* //
// Registration

Firebug.registerModule(Firebug.CommandEditor);

return Firebug.CommandEditor;

// ********************************************************************************************* //
}