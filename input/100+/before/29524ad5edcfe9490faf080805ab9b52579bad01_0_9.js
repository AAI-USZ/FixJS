function () {
        kontrol.Object.call(this);

        this.startAngle = null;
        this.xy = null;
        this.radius = null;
        this.lineWidth = null;
        this.cursorExt = null;
        this.w2 = null;
        this.PI2 = 2*Math.PI;

        this.extendsOptions = function () {
            this.options = $.extend(
                {
                    bgColor : this.target.data('bgcolor') || '#EEEEEE',
                    angleOffset : this.target.data('angleoffset') || 0,
                    angleArc : this.target.data('anglearc') || 360,
                    inline : true
                }, this.options
            );
        };

        this.val = function (v) {
            if (null != v) {
                this.newValue = this.options.stopper ? Math.max(Math.min(v, this.options.max), this.options.min) : v;
                this.value = this.newValue;
                this.target.val(this.value);
                this._draw();
            } else {
                return this.value;
            }
        };

        this.xy2val = function (x, y) {
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
        };

        this.listen = function () {
            // bind MouseWheel
            var self = this
                , mw = function (e) {
                            e.preventDefault();
                            var ori = e.originalEvent
                                ,deltaX = ori.detail || ori.wheelDeltaX
                                ,deltaY = ori.detail || ori.wheelDeltaY
                                ,val = parseInt(self.target.val()) + (deltaX>0 || deltaY>0 ? 1 : deltaX<0 || deltaY<0 ? -1 : 0);
                            self.val(val);
                        }
                , kval, to, m = 1, kv = {37:-1, 38:1, 39:1, 40:-1};

            this.target
                .bind(
                    "keydown"
                    ,function (e) {
                        var kc = e.keyCode;
                        kval = parseInt(String.fromCharCode(kc));

                        if (isNaN(kval)) {

                            (kc !== 13)         // enter
                            && (kc !== 8)       // bs
                            && (kc !== 9)       // tab
                            && (kc !== 189)     // -
                            && e.preventDefault();

                            // arrows
                            if ($.inArray(kc,[37,38,39,40]) > -1) {
                                var v = parseInt(self.target.val()) + kv[kc] * m;

                                self.options.stopper
                                && (v = Math.max(Math.min(v, self.options.max), self.options.min));

                                self._frame(e);
                                self.change(v);

                                // long time keydown speed-up
                                to = window.setTimeout(
                                                        function () { m < 20 && m++; }
                                                        ,30
                                                      );

                                e.preventDefault();
                            }
                        }
                    }
                )
                .bind(
                    "keyup"
                    ,function (e) {
                        if (isNaN(kval)) {
                            self.isPressed = false;
                            if (to) {
                                window.clearTimeout(to);
                                to = null;
                                m = 1;
                                self.val(self.target.val());
                            }
                        } else {
                            // kval postcond
                            (self.target.val() > self.options.max && self.target.val(self.options.max))
                            || (self.target.val() < self.options.min && self.target.val(self.options.min));
                        }

                    }
                );

            this.canvas.bind("mousewheel DOMMouseScroll", mw);
            this.target.bind("mousewheel DOMMouseScroll", mw)
        };

        this.init = function () {
            if (
                null === this.value
                || this.value < this.options.min
                || this.value > this.options.max
            ) this.value = this.options.min;
            this.target.val(this.value);
            this.w2 = this.options.width / 2;
            this.cursorExt = this.options.cursor / 100;
            this.xy = this.w2;
            this.lineWidth = this.xy * this.options.thickness;
            this.radius = this.xy - this.lineWidth / 2;

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
        };

        this.change = function (v) {
            this.newValue = v;
            this.target.val(v);
        };

        this._angle = function (v) {
            return (v - this.options.min) * this.angleArc / (this.options.max - this.options.min);
        };

        this.draw = function () {

            var a = this._angle(this.newValue)  // Angle
                , sat = this.startAngle         // Start angle
                , eat = sat + a                 // End angle
                , sa, ea                        // Previous angles
                , r = true;

            this.clear();

            this.context.lineWidth = this.lineWidth;

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
        };

        this.cancel = function () {
            this.val(this.value);
        };
    }