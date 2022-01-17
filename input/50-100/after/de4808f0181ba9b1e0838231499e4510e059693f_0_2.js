function () {
            this.copy(this.v, this.cv);
            this.i[0].val(this.cv[0]);
            this.i[1].val(this.cv[1]);
            this.m[0] = this.p[0];
            this.m[1] = this.p[1];
            this._draw();
        }