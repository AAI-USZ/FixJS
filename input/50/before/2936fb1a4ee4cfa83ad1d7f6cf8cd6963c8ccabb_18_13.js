function (tag) {
        cc.Assert(tag != cc.CCACTION_TAG_INVALID, "Invalid tag");
        cc.ActionManager.sharedManager().removeActionByTag(tag, this);
    }