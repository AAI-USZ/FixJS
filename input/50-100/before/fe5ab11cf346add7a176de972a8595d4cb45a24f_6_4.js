function (z) {
        var item;
        if (this._atlasIndexArray) {
            for (var i = 0; i < this._atlasIndexArray.length; i++) {
                item = this._atlasIndexArray[i]
                if (item == z) {
                    break;
                }
            }
        }
        cc.Assert(item, "TMX atlas index not found. Shall not happen");
        return i;
    }