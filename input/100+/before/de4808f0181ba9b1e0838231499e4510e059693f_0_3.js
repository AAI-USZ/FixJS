function () {

            var c = this.g
                , r = 1;

            if (this.o.displayPrevious) {
                c.beginPath();
                c.lineWidth = this.cursor;
                c.strokeStyle = this.pColor;
                c.moveTo(this.px, this.py + this.cur2);
                c.lineTo(this.px, this.py - this.cur2);
                c.stroke();
                r = (this.cv[0] == this.v[0] && this.cv[1] == this.v[1]);
            }

            c.beginPath();
            c.lineWidth = this.cursor;
            c.strokeStyle = r  ? this.o.fgColor : this.fgColor;
            c.moveTo(this.mx, this.my + this.cur2);
            c.lineTo(this.mx, this.my - this.cur2);
            c.stroke();
        }