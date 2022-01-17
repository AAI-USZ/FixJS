function () {

            var a = this._angle(this.newValue)  // Angle
                , sat = this.startAngle         // Start angle
                , eat = sat + a                 // End angle
                , sa, ea                        // Previous angles
                , r = true;

            this.clear();

            this.options.cursor
                && (sat = eat - this.cursorExt)
                && (eat = eat + this.cursorExt);

            this.context.beginPath();
            this.context.strokeStyle = this.options.bgColor;
            this.context.arc(this.xy, this.xy, this.radius, this.endAngle, this.startAngle, true);
            this.context.stroke();

            if (this.options.displayPrevious) {
                ea = this.startAngle + this._angle(this.value);
                sa = this.startAngle;
                this.options.cursor
                    && (sa = ea - this.cursorExt)
                    && (ea = ea + this.cursorExt);

                this.context.beginPath();
                this.context.strokeStyle = this.previousColor;
                this.context.arc(this.xy, this.xy, this.radius, sa, ea, false);
                this.context.stroke();
                r = (this.newValue == this.value);
            }

            this.context.beginPath();
            this.context.strokeStyle = r ? this.options.fgColor : this.fgColor ;
            this.context.arc(this.xy, this.xy, this.radius, sat, eat, false);
            this.context.stroke();
        }