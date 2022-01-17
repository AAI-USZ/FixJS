function (require, exports, module) {
    'use strict';
    
    /**
     * List of constants for global command IDs.
     */

    // FILE
    exports.FILE_NEW                    = "file.new";
    exports.FILE_OPEN                   = "file.open";
    exports.FILE_OPEN_FOLDER            = "file.openFolder";
    exports.FILE_SAVE                   = "file.save";
    exports.FILE_CLOSE                  = "file.close";
    exports.FILE_CLOSE_ALL              = "file.close_all";
    exports.FILE_CLOSE_WINDOW           = "file.close_window"; // string must MATCH string in native code (brackets_extensions)
    exports.FILE_ADD_TO_WORKING_SET     = "file.addToWorkingSet";
    exports.FILE_LIVE_FILE_PREVIEW      = "file.liveFilePreview";
    exports.FILE_QUIT                   = "file.quit"; // string must MATCH string in native code (brackets_extensions)

    // EDIT
    exports.EDIT_UNDO                   = "edit.undo";
    exports.EDIT_REDO                   = "edit.redo";
    exports.EDIT_CUT                    = "edit.cut";
    exports.EDIT_COPY                   = "edit.copy";
    exports.EDIT_PASTE                  = "edit.paste";
    exports.EDIT_SELECT_ALL             = "edit.selectAll";
    exports.EDIT_FIND                   = "edit.find";
    exports.EDIT_FIND_IN_FILES          = "edit.findInFiles";
    exports.EDIT_FIND_NEXT              = "edit.findNext";
    exports.EDIT_FIND_PREVIOUS          = "edit.findPrevious";
    exports.EDIT_REPLACE                = "edit.replace";
    exports.EDIT_INDENT                 = "edit.indent";
    exports.EDIT_UNINDENT               = "edit.unindent";
    exports.EDIT_DUPLICATE              = "edit.duplicate";
    exports.EDIT_LINE_COMMENT           = "edit.lineComment";

    // VIEW
    exports.VIEW_HIDE_SIDEBAR           = "view.hideSidebar";
    exports.VIEW_INCREASE_FONT_SIZE     = "view.increaseFontSize";
    exports.VIEW_DECREASE_FONT_SIZE     = "view.decreaseFontSize";
    
    // Navigate
    exports.NAVIGATE_NEXT_DOC           = "navigate.nextDoc";
    exports.NAVIGATE_PREV_DOC           = "navigate.prevDoc";
    exports.NAVIGATE_QUICK_OPEN         = "navigate.quickOpen";
    exports.NAVIGATE_GOTO_DEFINITION    = "navigate.gotoDefinition";
    exports.NAVIGATE_GOTO_LINE          = "navigate.gotoLine";
    exports.SHOW_INLINE_EDITOR          = "navigate.showInlineEditor";
    exports.QUICK_EDIT_NEXT_MATCH       = "navigate.nextMatch";
    exports.QUICK_EDIT_PREV_MATCH       = "navigate.previousMatch";

    // Debug
    exports.DEBUG_EXPERIMENTAL          = "debug.experimental";
    exports.DEBUG_REFRESH_WINDOW        = "debug.refreshWindow"; // string must MATCH string in native code (brackets_extensions)
    exports.DEBUG_SHOW_DEVELOPER_TOOLS  = "debug.showDeveloperTools";
    exports.DEBUG_RUN_UNIT_TESTS        = "debug.runUnitTests";
    exports.DEBUG_JSLINT                = "debug.jslint";
    exports.DEBUG_SHOW_PERF_DATA        = "debug.showPerfData";
    exports.DEBUG_NEW_BRACKETS_WINDOW   = "debug.newBracketsWindow";
    exports.DEBUG_CLOSE_ALL_LIVE_BROWSERS = "debug.closeAllLiveBrowsers";
    exports.DEBUG_USE_TAB_CHARS         = "debug.useTabChars";

	// Command that does nothing. Can be used for place holder menuItems
    
    exports.HELP_ABOUT                  = "help.about";
}