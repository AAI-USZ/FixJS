function () {
        var director = cc.Director.sharedDirector();
        this.setContentSize(director.getWinSize());
        return true;
    }