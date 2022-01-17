function () {
        var self = this;

        this.target = null; // selected DOM Element
        this.input = null; // HTMLInputElement or array of HTMLInputElement
        this.value = null; // mixed array or integer
        this.newValue = null; // not commited value
        this.x = 0; // canvas x position
        this.y = 0; // canvas y position
        this.dx = 0;
        this.dy = 0;
        this.options = null;
        this.canvas = null;
        this.context = null;
        this.fgColor = null;
        this.previousColor = null;
        this.touchesIndex = 0;
        this.isInitialized = false;
        this.drawHook = null;
        this.changeHook = null;
        this.cancelHook = null;
        this.releaseHook = null;
        this.drawReady = true;

        this.run = function () {
            var o, cf = function (e, conf) {
                var k;
                for (k in conf) {
                    self.options[k] = conf[k];
                }
                self.init();
                self._configure()
                    .draw();
            };

            if(this.target.data('kontroled')) return;
            this.target.data('kontroled', true);

            this.extendsOptions();
            o = this.options = $.extend(
                {
                    // Config
                    min : this.target.data('min') || 0,
                    max : this.target.data('max') || 100,
                    stopper : true,
                    readOnly : this.target.data('readonly'),

                    // UI
                    cursor : (this.target.data('cursor') === true && 30)
                                || this.target.data('cursor')
                                || 0,
                    thickness : this.target.data('thickness') || 0.35,
                    width : this.target.data('width') || 200,
                    height : this.target.data('height') || 200,
                    displayInput : this.target.data('displayinput') == null || this.target.data('displayinput'),
                    displayInputdisplayPrevious : this.target.data('displayprevious'),
                    fgColor : this.target.data('fgcolor') || '#87CEEB',
                    inline : false,

                    // Hooks
                    draw : null, // function () {}
                    change : null, // function (value) {}
                    cancel : null, // function () {}
                    release : null // function (value) {}
                }, this.options
            );

            // routing value
            if(this.target.is('fieldset')) {

                // fieldset = array of integer
                this.value = {};
                this.input = this.target.find('input')
                this.input.each(function(k) {
                    var $this = $(this);
                    self.input[k] = $this;
                    self.value[k] = $this.val();

                    $this.bind(
                        'change'
                        , function () {
                            var val = {};
                            val[k] = $this.val();
                            self.val(val);
                        }
                    );
                });
                this.target.find('legend').remove();

            } else {
                // input = integer
                this.input = this.target;
                this.value = this.target.val();

                this.target.bind(
                    'change'
                    , function () {
                        self.val(self.target.val());
                    }
                );
            }

            (!o.displayInput) && this.target.hide();

            this.canvas = $('<canvas width="' + o.width + 'px" height="' + o.height + 'px"></canvas>');
            this.target
                .wrap($('<div style="' + (o.inline ? 'display:inline;' : '') + 'width:' + o.width + 'px;height:' + o.height + 'px;"></div>'))
                .before(this.canvas);
            this.context = this.canvas[0].getContext("2d");

            if (this.value instanceof Object) {
                this.newValue = {};
                this.copyObjectTo(this.value, this.newValue);
            } else {
                this.newValue = this.value;
            }

            this.target
                .bind("configure", cf)
                .parent()
                .bind("configure", cf);

            this._listen()
                ._configure()
                ._xy()
                .init();

            this.isInitialized = true;

            this._draw();

            return this;
        };

        this._frame = function (e) {
            var redraw = function () {
                    if (self.isPressed) {
                        self._draw(e);
                        window.requestAnimFrame(redraw);
                    }
                }
            self.isPressed = true;
            window.requestAnimFrame(redraw);
        };

        this._draw = function (e) {
            if (
                this.drawHook
                && (this.drawHook() === false)
            ) return;

            this.draw();
            this.drawReady = true;
        };

        this._touchStart = function (e) {

            var touchMove = function (e) {
                if(!self.drawReady) return;

                var v = self._touchCapture(e).xy2val(self.dx, self.dy);
                if (v == this.newValue) return;

                if (
                    self.changeHook
                    && (self.changeHook(v) === false)
                ) return;

                self.change(v);
                self.drawReady = false;
            };

            this.touchesIndex = kontrol.Core.getTouchesIndex(e, this.touchesIndex);
            this.change(this._touchCapture(e).xy2val(this.dx,this.dy));
            this._frame(e);

            // Touch events listeners
            kontrol.Core.document
                .bind("touchmove.k", touchMove)
                .bind(
                    "touchend.k"
                    , function (e) {
                        kontrol.Core.document.unbind('touchmove.k touchend.k keyup.k');

                        self.isPressed = false;

                        if (
                            self.releaseHook
                            && (self.releaseHook(self.newValue) === false)
                        ) return;

                        self.val(self.newValue);
                    }
                );

            return this;
        };

        this._mouseDown = function (e) {

            var mouseMove = function (e) {
                if(!self.drawReady) return;

                var v = self.xy2val(e.pageX, e.pageY);
                if (v == self.newValue) return;

                if (
                    self.changeHook
                    && (self.changeHook(v) === false)
                ) return;

                self.change(v);
                self.drawReady = false;
            };

            this.change(this.xy2val(e.pageX, e.pageY));
            this._frame(e);

            // Mouse events listeners
            kontrol.Core.document
                .bind("mousemove.k", mouseMove)
                .bind(
                    // Escape key cancel current change
                    "keyup.k"
                    , function (e) {
                        if (e.keyCode === 27) {
                            kontrol.Core.document.unbind("mouseup.k mousemove.k keyup.k");

                            if (
                                self.cancelHook
                                && (self.cancelHook() === false)
                            ) return;

                            self.cancel();
                        }
                    }
                )
                .bind(
                    "mouseup.k"
                    , function (e) {

                        self.isPressed = false;

                        kontrol.Core.document.unbind('mousemove.k mouseup.k keyup.k');

                        if (
                            self.releaseHook
                            && (self.releaseHook(self.newValue) === false)
                        ) return;

                        self.val(self.newValue);
                    }
                );

            return this;
        };

        this._xy = function () {
            var offset = this.canvas.offset();
            this.x = offset.left;
            this.y = offset.top;
            return this;
        };

        this._listen = function () {

            if (!this.options.readOnly) {

                this.canvas
                    .bind(
                        "mousedown"
                        , function (e) {
                            e.preventDefault();
                            self._xy()._mouseDown(e);
                         }
                    )
                    .bind(
                        "touchstart"
                        , function (e) {
                            e.preventDefault();
                            self._xy()._touchStart(e);
                         }
                    );

                this.listen();
            } else {
                this.target.attr('readonly', 'readonly');
            }

            return this;
        };

        this._configure = function () {

            // Hooks
            if (this.options.draw) this.drawHook = this.options.draw;
            if (this.options.change) this.changeHook = this.options.change;
            if (this.options.cancel) this.cancelHook = this.options.cancel;
            if (this.options.release) this.releaseHook = this.options.release;

            if (this.options.displayPrevious) {
                this.previousColor = this.getColorRGBA(this.options.fgColor,"0.4");
                this.fgColor = this.getColorRGBA(this.options.fgColor,"0.7");
            } else {
                this.fgColor = this.options.fgColor;
            }

            return this;
        };

        this._touchCapture = function (e) {
            this.dx = e.originalEvent.touches[this.touchesIndex].pageX;
            this.dy = e.originalEvent.touches[this.touchesIndex].pageY;
            return this;
        };

        this.clear = function () {
            this.context.clearRect(0, 0, this.options.width, this.options.height);
        };

        // Abstract methods
        this.listen = function () {}; // on start, one time
        this.extendsOptions = function () {}; // each time configure triggered
        this.init = function () {}; // each time configure triggered
        this.change = function (v) {}; // on change
        this.val = function (v) {}; // on release
        this.xy2val = function (x, y) {}; //
        this.draw = function () {}; // on change / on release

        // Utils
        this.getColorRGBA = function (hexstr, opacity) {
            var h = hexstr.substring(1,7)
                ,rgb = [parseInt(h.substring(0,2),16)
                       ,parseInt(h.substring(2,4),16)
                       ,parseInt(h.substring(4,6),16)];
            return "rgba("+rgb[0]+","+rgb[1]+","+rgb[2]+","+opacity+")";
        };

        this.copyObjectTo = function (f, t) {
            for (var i in f) { t[i] = f[i]; }
        };
    }