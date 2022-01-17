function (time) {
        this.unschedule(this.resumeGrossini);

        var grossini = this.getChildByTag(TAG_GROSSINI);
        cc.ActionManager.sharedManager().resumeTarget(grossini);
    }