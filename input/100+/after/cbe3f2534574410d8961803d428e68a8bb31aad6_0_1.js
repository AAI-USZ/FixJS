function (x, y) {
            var a, ret;
            
            a = Math.atan2(
                        x - (this.x + this.w2)
                        , - (y - this.y - this.w2)
                    ) - this.angleOffset;

            if(this.angleArc != this.PI2 && (a < 0) && (a > -.5)) {
                // if isset angleArc option, set to min if .5 under min
                a = 0;
            } else if (a < 0) {
                a += this.PI2;
            }

            ret = Math.round(a * (this.options.max - this.options.min) / this.angleArc)
                    + this.options.min;

            this.options.stopper
                && (ret = Math.max(Math.min(ret, this.options.max), this.options.min));

            return ret;
        }