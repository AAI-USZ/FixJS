function (pos) {
        var ret = 0;
        var maxVal = 0;
        if (this._useAutomaticVertexZ) {
            switch (this._layerOrientation) {
                case cc.TMXOrientationIso:
                    maxVal = this._layerSize.width + this._layerSize.height;
                    ret = -(maxVal - (pos.x + pos.y));
                    break;
                case cc.TMXOrientationOrtho:
                    ret = -(this._layerSize.height - pos.y);
                    break;
                case cc.TMXOrientationHex:
                    cc.Assert(0, "TMX Hexa zOrder not supported");
                    break;
                default:
                    cc.Assert(0, "TMX invalid value");
                    break;
            }
        }
        else {
            ret = this._vertexZvalue;
        }
        return ret;
    }