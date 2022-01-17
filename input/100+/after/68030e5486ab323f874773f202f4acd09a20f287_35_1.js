function (require, exports, module) {
    "use strict";

    // Load dependent modules
    var EditorManager       = require("editor/EditorManager");
    
    /**
     * @constructor
     *
     */
    function InlineWidget() {
        // create the outer wrapper div
        this.htmlContent = window.document.createElement("div");
        this.$htmlContent = $(this.htmlContent).addClass("inline-widget");
        this.$htmlContent.append("<div class='shadow top' />")
            .append("<div class='shadow bottom' />");
    }
    InlineWidget.prototype.htmlContent = null;
    InlineWidget.prototype.$htmlContent = null;
    InlineWidget.prototype.id = null;
    InlineWidget.prototype.hostEditor = null;

    /**
     * Initial height of inline widget in pixels. Can be changed later via hostEditor.setInlineWidgetHeight()
     * @type {number}
     */
    InlineWidget.prototype.height = 0;
    
    /**
     * Closes this inline widget and all its contained Editors
     */
    InlineWidget.prototype.close = function () {
        var shouldMoveFocus = this._editorHasFocus();
        EditorManager.closeInlineWidget(this.hostEditor, this, shouldMoveFocus);
        // closeInlineWidget() causes our onClosed() handler to be called
    };
    
    /**
     * Called any time inline is closed, whether manually or automatically
     */
    InlineWidget.prototype.onClosed = function () {
        // do nothing - base implementation
    };

    /**
     * Called once content is parented in the host editor's DOM. Useful for performing tasks like setting
     * focus or measuring content, which require htmlContent to be in the DOM tree.
     */
    InlineWidget.prototype.onAdded = function () {
        // do nothing - base implementation
    };

    /**
     * @param {Editor} hostEditor
     */
    InlineWidget.prototype.load = function (hostEditor) {
        this.hostEditor = hostEditor;

        // TODO: incomplete impelementation. It's not clear yet if InlineTextEditor
        // will fuction as an abstract class or as generic inline editor implementation
        // that just shows a range of text. See CSSInlineEditor.css for an implementation of load()
    };
    

    /**
     * Called when the editor containing the inline is made visible.
     */
    InlineWidget.prototype.onParentShown = function () {
        // do nothing - base implementation
    };

    exports.InlineWidget = InlineWidget;

}