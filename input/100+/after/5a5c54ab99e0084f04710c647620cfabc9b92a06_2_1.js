function() {
    var x = this.doc.getElementById("xml3DElem"), actual, win = this.doc.defaultView;
    var gl = getContextForXml3DElement(x);
    var h = getHandler(x);
    var cgroup = this.doc.getElementById("coloredMeshGroup");

    cgroup.visible = true;
    h.draw();
    actual = win.getPixelValue(gl, 90, 90);
    QUnit.closePixel(actual, [225,225,60,255], 1, "Corners have colors red, yellow, green, blue");

}