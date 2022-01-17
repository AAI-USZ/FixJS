function (tag) {
        cc.Assert(tag != cc.CCACTION_TAG_INVALID, "Invalid tag");
        this._actionManager.removeActionByTag(tag, this);
    }