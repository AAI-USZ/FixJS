function (x, y) {
            var b, a, ret;
            b = a = Math.atan2(
                        x - (this.x + this.w2)
                        , - (y - this.y - this.w2)
                    ) - this.angleOffset;
            (a < 0) && (b = a + this.angleArc);
            ret = Math.round(b * (this.options.max - this.options.min) / this.angleArc)
                    + this.options.min;
            this.options.stopper
                && (ret = Math.max(Math.min(ret, this.options.max), this.options.min));

            return ret;
        }