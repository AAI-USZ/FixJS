function() {
        this.draco = this.getDraconiticDaysPerMonth();
        this.zodic = this.getZodicalDaysPerMonth();
        this.sphere[1].setSpeed(this.moonSpeed1(this.draco, this.zodic));
        this.sphere[2].setSpeed(this.moonSpeed2(this.draco, this.zodic));
        this.sphere[3].setSpeed(0);
    }