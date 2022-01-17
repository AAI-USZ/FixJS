function (x, y, buttonState)
{
    var tDist = 3.0;  // distance modifier for lookat, could be param
    var dir;
    var navi = this._scene.getNavigationInfo();

    if (this._scene._vf.pickMode.toLowerCase() !== "box") {
        this.prepareEvents(x, y, buttonState, "onmouseup");

        // click means that mousedown _and_ mouseup were detected on same element
        if (this._pickingInfo.pickObj &&
            this._pickingInfo.pickObj === this._pickingInfo.lastClickObj) {
            this.prepareEvents(x, y, buttonState, "onclick");
        }
    }
    else {
        var t0 = new Date().getTime();
        var line = this.calcViewRay(x, y);
        var isect = this._scene.doIntersect(line);
        var obj = line.hitObject;

        if (isect && obj)
        {
            this._pick.setValues(line.hitPoint);

            this.checkEvents(obj, x, y, buttonState, "onclick");

            x3dom.debug.logInfo("Hit '" + obj._xmlNode.localName + "/ " +
                                obj._DEF + "' at dist=" + line.dist.toFixed(4));
            x3dom.debug.logInfo("Ray hit at position " + this._pick);
        }

        var t1 = new Date().getTime() - t0;
        x3dom.debug.logInfo("Picking time (box): " + t1 + "ms");

        if (!isect) {
            dir = this.getViewMatrix().e2().negate();
            var u = dir.dot(line.pos.negate()) / dir.dot(line.dir);
            this._pick = line.pos.add(line.dir.multiply(u));
            //x3dom.debug.logInfo("No hit at position " + this._pick);
        }
    }

    if (this._pickingInfo.pickObj && navi._vf.type[0].toLowerCase() === "lookat" &&
        this._pressX === x && this._pressY === y)
    {
        var step = (this._lastButton & 2) ? -1 : 1;
        var dist = this._pickingInfo.pickPos.subtract(this._from).length() / tDist;

        var laMat = new x3dom.fields.SFMatrix4f();
        laMat.setValues(this.getViewMatrix());
        laMat = laMat.inverse();

        var from = laMat.e3();
        var at = from.subtract(laMat.e2());
        var up = laMat.e1();

        dir = this._pickingInfo.pickPos.subtract(from);
        var len = dir.length();
        dir = dir.normalize();

        var newUp = new x3dom.fields.SFVec3f(0, 1, 0);
        var newAt = from.addScaled(dir, len);

        var s = dir.cross(newUp).normalize();
        dir = s.cross(newUp).normalize();

        if (step < 0) {
            dist = (0.5 + len + dist) * 2;
        }
        var newFrom = newAt.addScaled(dir, dist);

        laMat = x3dom.fields.SFMatrix4f.lookAt(newFrom, newAt, newUp);
        laMat = laMat.inverse();

        dist = newFrom.subtract(from).length();
        var dur = Math.max(0.5, Math.log((1 + dist) / navi._vf.speed));

        this.animateTo(laMat, this._scene.getViewpoint(), dur);
    }

    this._dx = 0;
    this._dy = 0;
    this._lastX = x;
    this._lastY = y;
    this._lastButton = buttonState;
}