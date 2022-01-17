function (tag, cleanup) {
        cc.Assert(tag != cc.NODE_TAG_INVALID, "Invalid tag");

        var child = this.getChildByTag(tag);
        if (child == null) {
            cc.log("cocos2d: removeChildByTag: child not found!");
        }
        else {
            this.removeChild(child, cleanup);
        }
    }