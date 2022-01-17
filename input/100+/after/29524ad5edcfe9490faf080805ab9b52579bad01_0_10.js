function (col) {

            var x = (col * (this.colWidth + this.options.spacing) + this.colWidth / 2);

            if (this.displayMidLine) {
                this.context.beginPath();
                this.context.lineWidth = this.colWidth;
                this.context.strokeStyle = this.options.fgColor;
                this.context.moveTo(x, this.mid);
                this.context.lineTo(x, this.mid + 1);
                this.context.stroke();
            }

            if (this.options.displayPrevious) {
                this.context.beginPath();
                this.context.lineWidth = this.colWidth;
                this.context.strokeStyle = (this.newValue[col] == this.value[col]) ? this.options.fgColor : this.previousColor;
                if (this.options.cursor) {
                    this.context.lineTo(x, this.mid - Math.floor(this.value[col] * this.bar) + this.options.cursor / 2);
                } else {
                    this.context.moveTo(x, this.mid);
                }
                this.context.lineTo(x, this.mid - Math.floor(this.value[col] * this.bar) - this.options.cursor / 2);
                this.context.stroke();
            }

            this.context.beginPath();
            this.context.lineWidth = this.colWidth;
            this.context.strokeStyle = this.fgColor;
            if (this.options.cursor) {
                this.context.lineTo(x, this.mid - Math.floor(this.newValue[col] * this.bar) + this.options.cursor / 2);
            } else {
                this.context.moveTo(x, this.mid);
            }
            this.context.lineTo(x, this.mid - Math.floor(this.newValue[col] * this.bar) - this.options.cursor / 2);
            this.context.stroke();
        }