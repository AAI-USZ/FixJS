function () {
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
        }