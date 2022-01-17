function (dt) {
        this.unschedule(this.unpause);
        var node = this.getChildByTag(TAG_GROSSINI);
        cc.Director.sharedDirector().getActionManager().resumeTarget(node);
    }