function(editor) {
    this.editor = editor;

    new DefaultHandlers(this);
    new DefaultGutterHandler(this);

    event.addListener(editor.container, "mousedown", function(e) {
        editor.focus();
        return event.preventDefault(e);
    });

    var mouseTarget = editor.renderer.getMouseEventTarget();
    event.addListener(mouseTarget, "mousedown", this.onMouseEvent.bind(this, "mousedown"));
    event.addListener(mouseTarget, "click", this.onMouseEvent.bind(this, "click"));
    event.addListener(mouseTarget, "mousemove", this.onMouseMove.bind(this, "mousemove"));
    event.addMultiMouseDownListener(mouseTarget, 0, 2, 500, this.onMouseEvent.bind(this, "dblclick"));
    event.addMultiMouseDownListener(mouseTarget, 0, 3, 600, this.onMouseEvent.bind(this, "tripleclick"));
    event.addMultiMouseDownListener(mouseTarget, 0, 4, 600, this.onMouseEvent.bind(this, "quadclick"));
    event.addMouseWheelListener(editor.container, this.onMouseWheel.bind(this, "mousewheel"));

    var gutterEl = editor.renderer.$gutter;
    event.addListener(gutterEl, "mousedown", this.onMouseEvent.bind(this, "guttermousedown"));
    event.addListener(gutterEl, "click", this.onMouseEvent.bind(this, "gutterclick"));
    event.addListener(gutterEl, "dblclick", this.onMouseEvent.bind(this, "gutterdblclick"));
    event.addListener(gutterEl, "mousemove", this.onMouseMove.bind(this, "gutter"));
}