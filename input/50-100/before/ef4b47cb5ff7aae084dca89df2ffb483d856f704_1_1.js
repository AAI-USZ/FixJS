function removeEvents() {
    canvas.unbind('mousemove');
    canvas.unbind('mouseup');
    canvas.unbind('mousedown');
    menuBar.unbind('mousedown');
    canvas.removeAttr('ontouchmove');
    canvas.removeAttr('ontouchend');
    canvas.removeAttr('ontouchstart');
    $('html').unbind('keydown');
}