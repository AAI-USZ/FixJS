function (tag) {
        cc.Assert(tag != cc.CCACTION_TAG_INVALID, "Invalid tag");
        return cc.ActionManager.sharedManager().getActionByTag(tag, this);
    }