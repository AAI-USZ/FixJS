function (time) {
        if (this._target && !this.isDone()) {
            var slice = 1.0 / this._times;
            var m = time % slice;
            this._target.setIsVisible(m > slice / 2 ? true : false);
        }
    }