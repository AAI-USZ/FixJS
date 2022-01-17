function (x, y, buttonState, eventType)
{
    var avoidTraversal = (this._scene._vf.pickMode.toLowerCase() === "idbuf" ||
                          this._scene._vf.pickMode.toLowerCase() === "color" ||
                          this._scene._vf.pickMode.toLowerCase() === "texcoord");

    if (avoidTraversal) {
        var obj = this._pickingInfo.pickObj;

        if (obj) {
            this._pick.setValues(this._pickingInfo.pickPos);

            this.checkEvents(obj, x, y, buttonState, eventType);

            if (eventType === "onclick") {  // debug
                x3dom.debug.logInfo("Hit \"" + obj._xmlNode.localName + "/ " + obj._DEF + "\"");
                x3dom.debug.logInfo("Ray hit at position " + this._pick);
            }
        }
    }
}