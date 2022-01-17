function (x, y) {
            this.mx = max(this.cur2, min(x - this.x, this.o.width - this.cur2));
            this.my = max(this.cur2, min(y - this.y, this.o.height - this.cur2));
            return [
                    ~~ (this.o.min + (this.mx - this.cur2) * this.xunit),
                    ~~ (this.o.min + (this.o.height - this.my - this.cur2) * this.yunit)
                    ];
        }