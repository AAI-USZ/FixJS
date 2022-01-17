function () {
        k.o.call(this);

        this.mx = 0;
        this.my = 0;
        this.px = 0;
        this.py = 0;
        this.cur2 = 0;
        this.cursor = 0;
        this.v = {};
        this.div = null;

        this.extend = function () {
            this.o = $.extend(
                {
                    min : this.$.data('min') || 0,
                    max : this.$.data('max') || 100,
                    width : this.$.data('width') || 200,
                    height : this.$.data('height') || 200
                }, this.o
            );
        };

        this.init = function () {
            this.cursor = this.o.cursor || 30;
            this.cur2 = this.cursor / 2;
            this.xunit = (this.o.max - this.o.min) / (this.o.width - this.cursor);
            this.yunit = (this.o.max - this.o.min) / (this.o.height - this.cursor);

            if (!this.isInit) {
                this.mx = this.px = ~~ (0.5 + this.cur2 + (this.v[0] - this.o.min) / this.xunit) >> 0;
                this.my = this.py = ~~ (0.5 + this.o.height - (this.cur2 + (this.v[1] - this.o.min) / this.yunit));
            }

            if(this.o.displayInput) {
                var s = this;
                this.$.css({
                        'margin-top' : '-30px'
                        , 'border' : 0
                        , 'font' : '11px Arial'
                        });

                this.i.each(
                    function (){
                        $(this).css({
                            'width' : (s.o.width / 4) + 'px'
                            ,'border' : 0
                            ,'background' : 'none'
                            ,'color' : s.o.fgColor
                            ,'padding' : '0px'
                            ,'-webkit-appearance': 'none'
                            });
                    });
            } else {
                this.$.css({
                        'width' : '0px'
                        ,'visibility' : 'hidden'
                        });
            }
        };

        this.xy2val = function (x, y) {
            this.mx = max(this.cur2, min(x - this.x, this.o.width - this.cur2));
            this.my = max(this.cur2, min(y - this.y, this.o.height - this.cur2));
            return [
                    ~~ (this.o.min + (this.mx - this.cur2) * this.xunit),
                    ~~ (this.o.min + (this.o.height - this.my - this.cur2) * this.yunit)
                    ];
        };

        this.change = function (v) {
            this.cv = v;
            this.i[0].val(this.cv[0]);
            this.i[1].val(this.cv[1]);
        };

        this.val = function (v) {
            if (null !== v) {
                this.cv = v;
                this.copy(this.cv, this.v);
                this.px = this.mx;
                this.py = this.my;
                this._draw();
            } else {
                return this.v;
            }
        };

        this.cancel = function () {
            this.copy(this.v, this.cv);
            this.i[0].val(this.cv[0]);
            this.i[1].val(this.cv[1]);
            this.mx = this.px;
            this.my = this.py;
            this._draw();
        };

        this.draw = function () {

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
        };
    }