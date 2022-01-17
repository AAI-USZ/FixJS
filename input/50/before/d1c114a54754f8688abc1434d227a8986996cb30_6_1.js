function (dt) {
        this.unschedule(this.unpause);
        var node = this.getChildByTag(TAG_GROSSINI);
        cc.ActionManager.sharedManager().resumeTarget(node);
    }