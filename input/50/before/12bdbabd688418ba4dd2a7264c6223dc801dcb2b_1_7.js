function (tag) {
        cc.Assert(tag != cc.CCACTION_TAG_INVALID, "Invalid tag");
        return this._actionManager.getActionByTag(tag, this);
    }