function () {
        cc.Director.sharedDirector().getScheduler().scheduleUpdateForTarget(this, 0, false);
        return true;
    }