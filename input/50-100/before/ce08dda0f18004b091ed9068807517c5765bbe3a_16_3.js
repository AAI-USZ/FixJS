function (aTag) {
        cc.Assert(aTag != cc.CCNODE_TAG_INVALID, "Invalid tag");
        if (this._children != null) {
            for (var i = 0; i < this._children.length; i++) {
                var node = this._children[i];
                if (node && node._tag == aTag) {
                    return node;
                }
            }
        }
        //throw "not found";
        return null;
    }