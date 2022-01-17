function (col) {

            var o = this.options
                , x
                , c = this.context;

            x = (col * (this.colWidth + o.spacing) + this.colWidth / 2);

            if (this.displayMidLine) {
                c.beginPath();
                c.lineWidth = this.colWidth;
                c.strokeStyle = this.options.fgColor;
                c.moveTo(x, this.mid);
                c.lineTo(x, this.mid + 1);
                c.stroke();
            }

            if (this.options.displayPrevious) {
                c.beginPath();
                c.lineWidth = this.colWidth;
                c.strokeStyle = (this.newValue[col] == this.value[col]) ? o.fgColor : this.previousColor;
                if (this.options.cursor) c.lineTo(x, this.mid - Math.floor(this.value[col] * this.bar) + this.options.cursor / 2);
                else c.moveTo(x, this.mid);
                c.lineTo(x, this.mid - Math.floor(this.value[col] * this.bar) - this.options.cursor / 2);
                c.stroke();
            }

            c.beginPath();
            c.lineWidth = this.colWidth;
            c.strokeStyle = this.fgColor;
            if (this.options.cursor) c.lineTo(x, this.mid - Math.floor(this.newValue[col] * this.bar) + this.options.cursor / 2);
            else c.moveTo(x, this.mid);
            c.lineTo(x, this.mid - Math.floor(this.newValue[col] * this.bar) - this.options.cursor / 2);
            c.stroke();
        }