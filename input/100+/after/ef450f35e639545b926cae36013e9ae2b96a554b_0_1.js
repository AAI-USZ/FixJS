function () {
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
                (this.value == '') && (this.value = this.options.min);

                this.target.bind(
                    'change'
                    , function () {
                        self.val(self.target.val());
                    }
                );
            }

            (!o.displayInput) && this.target.hide();

            this.canvas = $('<canvas width="' + o.width + 'px" height="' + o.height + 'px"></canvas>');
            this.context = this.canvas[0].getContext("2d");
            
            this.target
                .wrap($('<div style="' + (o.inline ? 'display:inline;' : '') + 'width:' + o.width + 'px;height:' + o.height + 'px;"></div>'))
                .before(this.canvas);

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
        }