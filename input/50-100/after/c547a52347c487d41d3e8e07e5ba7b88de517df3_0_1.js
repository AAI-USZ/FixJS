function(onRender, window) {
    this.onRender = onRender;
    this.pending = false;
    this.changes = 0;
    this.setTimeoutZero = (window.requestAnimationFrame ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame ||
         window.oRequestAnimationFrame ||
         window.msRequestAnimationFrame ||
         window.setTimeout).bind(window);
}