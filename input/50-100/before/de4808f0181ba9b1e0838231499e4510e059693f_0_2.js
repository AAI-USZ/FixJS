function () {
            this.copy(this.v, this.cv);
            this.i[0].val(this.cv[0]);
            this.i[1].val(this.cv[1]);
            this.mx = this.px;
            this.my = this.py;
            this._draw();
        }