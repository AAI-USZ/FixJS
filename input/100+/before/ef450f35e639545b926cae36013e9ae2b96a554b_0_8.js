function () {
            if (
                null === this.value
                || this.value < this.options.min
                || this.value > this.options.max
            ) this.value = this.options.min;
            this.target.val(this.value);
            this.w2 = this.options.width / 2;
            this.cursorExt = this.options.cursor / 100;
            this.xy = this.w2;
            this.context.lineWidth = this.xy * this.options.thickness;
            this.radius = this.xy - this.context.lineWidth / 2;

            this.options.angleOffset
            && (this.options.angleOffset = isNaN(this.options.angleOffset) ? 0 : this.options.angleOffset);

            this.options.angleArc
            && (this.options.angleArc = isNaN(this.options.angleArc) ? this.PI2 : this.options.angleArc);

            // deg to rad
            this.angleOffset = this.options.angleOffset * Math.PI / 180;
            this.angleArc = this.options.angleArc * Math.PI / 180;

            // compute start and end angles
            this.startAngle = 1.5 * Math.PI + this.angleOffset;
            this.endAngle = 1.5 * Math.PI + this.angleOffset + this.angleArc;

            var s = Math.max(
                            String(Math.abs(this.options.max)).length
                            , String(Math.abs(this.options.min)).length
                            , 2
                            ) + 2;

            this.options.displayInput
                && this.input.css({
                        'width' : (this.options.width / 2 + 4) + 'px'
                        ,'height' : this.options.width / 3
                        ,'position' : 'absolute'
                        ,'vertical-align' : 'middle'
                        ,'margin-top' : this.options.width / 3 + 'px'
                        ,'margin-left' : '-' + (this.options.width * 3 / 4 + 2) + 'px'
                        ,'border' : 0
                        ,'background' : 'none'
                        ,'font' : 'bold ' + this.options.width / s + 'px Arial'
                        ,'text-align' : 'center'
                        ,'color' : this.options.fgColor
                        ,'padding' : '0px'
                        ,'-webkit-appearance': 'none'
                        })
                || this.input.css({
                        'width' : '0px'
                        ,'visibility' : 'hidden'
                        });
        }