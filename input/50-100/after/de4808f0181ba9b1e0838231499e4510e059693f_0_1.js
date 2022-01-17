function (v) {
            if (null !== v) {
                this.cv = v;
                this.copy(this.cv, this.v);
                this._coord();
                this._draw();
            } else {
                return this.v;
            }
        }