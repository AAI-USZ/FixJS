function() {
        this.draco = model.getDraconiticDaysPerMonth();
        this.zodic = model.getZodicalDaysPerMonth();
        model.sphere[1].setSpeed(this.moonSpeed1(this.draco, this.zodic));
        model.sphere[2].setSpeed(this.moonSpeed2(this.draco, this.zodic));
        model.sphere[3].setSpeed(0);
    }