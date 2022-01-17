function (tag) {
        cc.Assert(tag != cc.CCACTION_TAG_INVALID, "Invalid tag");
        return this.getActionManager().getActionByTag(tag, this);
    }