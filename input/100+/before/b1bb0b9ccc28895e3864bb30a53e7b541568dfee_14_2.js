function(require, exports, module) {
"use strict";

var dom = require("../lib/dom");
var BrowserFocus = require("../lib/browser_focus").BrowserFocus;


var DRAG_OFFSET = 5; // pixels



function DefaultHandlers(mouseHandler) {
    mouseHandler.$clickSelection = null;
    mouseHandler.browserFocus = new BrowserFocus();

    var editor = mouseHandler.editor;
    editor.setDefaultHandler("mousedown", this.onMouseDown.bind(mouseHandler));
    editor.setDefaultHandler("dblclick", this.onDoubleClick.bind(mouseHandler));
    editor.setDefaultHandler("tripleclick", this.onTripleClick.bind(mouseHandler));
    editor.setDefaultHandler("quadclick", this.onQuadClick.bind(mouseHandler));
    editor.setDefaultHandler("mousewheel", this.onScroll.bind(mouseHandler));

    var exports = ["select", "startSelect", "drag", "dragEnd", "dragWait",
        "dragWaitEnd", "startDrag"];

    exports.forEach(function(x) {
        mouseHandler[x] = this[x];
    }, this);

    mouseHandler.selectByLines = this.extendSelectionBy.bind(mouseHandler, "getLineRange");
    mouseHandler.selectByWords = this.extendSelectionBy.bind(mouseHandler, "getWordRange");
}

(function() {

    this.onMouseDown = function(ev) {
        this.mousedownEvent = ev;
        var inSelection = ev.inSelection();
        var pos = ev.getDocumentPosition();
        var editor = this.editor;
        var _self = this;

        var button = ev.getButton();
        if (button !== 0) {
            var selectionRange = editor.getSelectionRange();
            var selectionEmpty = selectionRange.isEmpty();

            if (selectionEmpty) {
                editor.moveCursorToPosition(pos);
                editor.selection.clearSelection();
            }

            // 2: contextmenu, 1: linux paste
            editor.textInput.onContextMenu(ev.domEvent);
            return ev.stop();
        }

        // if this click caused the editor to be focused should not clear the
        // selection
        if (inSelection && !editor.isFocused()) {
            editor.focus();
            return;
        }

        if (!inSelection || this.$clickSelection || ev.getShiftKey()) {
            // Directly pick STATE_SELECT, since the user is not clicking inside
            // a selection.
            this.startSelect(pos);
        } else if (inSelection) {
            var e = ev.domEvent;
            if ((e.ctrlKey || e.altKey)) {
                this.startDrag();
            } else {
                this.mousedownEvent.time = (new Date()).getTime();
                this.setState("dragWait");
            }
        }

        this.captureMouse(ev)
    };

    this.startSelect = function(pos) {
        pos = pos || this.editor.renderer.screenToTextCoordinates(this.x, this.y);
        if (this.mousedownEvent.getShiftKey()) {
            this.editor.selection.selectToPosition(pos);
        }
        else if (!this.$clickSelection) {
            this.editor.moveCursorToPosition(pos);
            this.editor.selection.clearSelection();
        }
        this.setState("select");
    }

    this.select = function() {
        var anchor, editor = this.editor;
        var cursor = editor.renderer.screenToTextCoordinates(this.x, this.y);

        if (this.$clickSelection) {
            var cmp = this.$clickSelection.comparePoint(cursor);

            if (cmp == -1) {
                anchor = this.$clickSelection.end;
            } else if (cmp == 1) {
                anchor = this.$clickSelection.start;
            } else {
                cursor = this.$clickSelection.end;
                anchor = this.$clickSelection.start;
            }
            editor.selection.setSelectionAnchor(anchor.row, anchor.column);
        }
        editor.selection.selectToPosition(cursor);

        editor.renderer.scrollCursorIntoView();
    };

    this.extendSelectionBy = function(unitName) {
        var anchor, editor = this.editor;
        var cursor = editor.renderer.screenToTextCoordinates(this.x, this.y);
        var range = editor.selection[unitName](cursor.row, cursor.column);

        if (this.$clickSelection) {
            var cmpStart = this.$clickSelection.comparePoint(range.start);
            var cmpEnd = this.$clickSelection.comparePoint(range.end);

            if (cmpStart == -1 && cmpEnd <= 0) {
                anchor = this.$clickSelection.end;
                cursor = range.start;
            } else if (cmpEnd == 1 && cmpStart >= 0) {
                anchor = this.$clickSelection.start;
                cursor = range.end;
            } else if (cmpStart == -1 && cmpEnd == 1) {
                cursor = range.end;
                anchor = range.start;
            } else {
                cursor = this.$clickSelection.end;
                anchor = this.$clickSelection.start;
            }
            editor.selection.setSelectionAnchor(anchor.row, anchor.column);
        }
        editor.selection.selectToPosition(cursor);

        editor.renderer.scrollCursorIntoView();
    };

    this.startDrag = function() {
        var editor = this.editor;
        this.setState("drag");
        this.dragRange = editor.getSelectionRange();
        var style = editor.getSelectionStyle();
        this.dragSelectionMarker = editor.session.addMarker(this.dragRange, "ace_selection", style);
        editor.clearSelection();
        dom.addCssClass(editor.container, "ace_dragging");
        if (!this.$dragKeybinding) {
            this.$dragKeybinding = {
                handleKeyboard: function(data, hashId, keyString, keyCode) {
                    if (keyString == "esc")
                        return {command: this.command};
                },
                command: {
                    exec: function(editor) {
                        var self = editor.$mouseHandler;
                        self.dragCursor = null
                        self.dragEnd();
                        self.startSelect();
                    }
                }
            }
        }

        editor.keyBinding.addKeyboardHandler(this.$dragKeybinding);
    };

    this.dragWait = function() {
        var distance = calcDistance(this.mousedownEvent.x, this.mousedownEvent.y, this.x, this.y);
        var time = (new Date()).getTime();
        var editor = this.editor;

        if (distance > DRAG_OFFSET) {
            this.startSelect();
        } else if ((time - this.mousedownEvent.time) > editor.getDragDelay()) {
            this.startDrag()
        }
    };

    this.dragWaitEnd = function(e) {
        this.mousedownEvent.domEvent = e;
        this.startSelect();
    };

    this.drag = function() {
        var editor = this.editor;
        this.dragCursor = editor.renderer.screenToTextCoordinates(this.x, this.y);
        editor.moveCursorToPosition(this.dragCursor);
        editor.renderer.scrollCursorIntoView();
    };

    this.dragEnd = function(e) {
        var editor = this.editor;
        var dragCursor = this.dragCursor;
        var dragRange = this.dragRange;
        dom.removeCssClass(editor.container, "ace_dragging");
        editor.session.removeMarker(this.dragSelectionMarker);
        editor.keyBinding.removeKeyboardHandler(this.$dragKeybinding);

        if (!dragCursor)
            return;

        editor.clearSelection();
        if (e && (e.ctrlKey || e.altKey)) {
            var session = editor.session;
            var newRange = dragRange;
            newRange.end = session.insert(dragCursor, session.getTextRange(dragRange));
            newRange.start = dragCursor;
        } else if (dragRange.contains(dragCursor.row, dragCursor.column)) {
            return;
        } else {
            var newRange = editor.moveText(dragRange, dragCursor);
        }

        if (!newRange)
            return;

        editor.selection.setSelectionRange(newRange);
    };

    this.onDoubleClick = function(ev) {
        var pos = ev.getDocumentPosition();
        var editor = this.editor;

        this.setState("selectByWords");

        editor.moveCursorToPosition(pos);
        editor.selection.selectWord();
        this.$clickSelection = editor.getSelectionRange();
    };

    this.onTripleClick = function(ev) {
        var pos = ev.getDocumentPosition();
        var editor = this.editor;

        this.setState("selectByLines");

        editor.moveCursorToPosition(pos);
        editor.selection.selectLine();
        this.$clickSelection = editor.getSelectionRange();
    };

    this.onQuadClick = function(ev) {
        var editor = this.editor;

        editor.selectAll();
        this.$clickSelection = editor.getSelectionRange();
        this.setState("null");
    };

    this.onScroll = function(ev) {
        var editor = this.editor;
        var isScrolable = editor.renderer.isScrollableBy(ev.wheelX * ev.speed, ev.wheelY * ev.speed);
        if (isScrolable) {
            this.$passScrollEvent = false;
        } else {
            if (this.$passScrollEvent)
                return;

            if (!this.$scrollStopTimeout) {
                var self = this;
                this.$scrollStopTimeout = setTimeout(function() {
                    self.$passScrollEvent = true;
                    self.$scrollStopTimeout = null;
                }, 200);
            }
        }

        editor.renderer.scrollBy(ev.wheelX * ev.speed, ev.wheelY * ev.speed);
        return ev.preventDefault();
    };

}).call(DefaultHandlers.prototype);

exports.DefaultHandlers = DefaultHandlers;

function calcDistance(ax, ay, bx, by) {
    return Math.sqrt(Math.pow(bx - ax, 2) + Math.pow(by - ay, 2));
}

}