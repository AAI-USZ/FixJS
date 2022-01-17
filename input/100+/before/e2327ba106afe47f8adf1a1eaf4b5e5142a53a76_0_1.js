function(target, field, params, handlers) {
            params   = params   || {};
            handlers = handlers || {};

            var
                alias = '',
                self  = this,
                tmpl  = this._default.tmpl,
                pure  = new Date();

            /**
             * Visibility indicator
             */
            this.shown = false;

            // Setup language settings
            Cal.lang(params.lang);

            /**
             * The way calendar should work with the field node
             *
             * @private
             */
             if (field) {
                 if (field.innerHTML) {
                     this._way = 'innerHTML';
                 } else {
                     this._way = 'value';
                 }
             }

            // Setup templates
            if (!params.tmpl) {
                params.tmpl = {};
            }

            for (alias in tmpl) {
                if (!params.tmpl[alias]) {
                    params.tmpl[alias] = tmpl[alias];
                }
            }

            // Setup minimal date
            if (!params.min_date) {
                params.min_date = new Date(
                    pure.getFullYear(),
                    pure.getMonth(),
                    pure.getDate() - 1
                );
            } else if (typeof params.min_date == 'string') {
                params.min_date = Cal.parse(params.min_date);
            }

            /**
             * Minimal approved date
             *
             * @private
             */
            this._min = params.min_date;

            // Setup current date
            if (!params.now_date) {
                params.now_date = pure;
            } else if (typeof params.now_date == 'string') {
                params.now_date = Cal.parse(params.now_date);
            }

            /**
             * Current date
             *
             * @private
             */
            this._now = params.now_date;

            // Setup maximal date
            if (!params.max_date) {
                params.max_date = new Date(
                    pure.getFullYear() + 1,
                    pure.getMonth(),
                    pure.getDate()
                );
            } else if (typeof params.max_date == 'string') {
                params.max_date = Cal.parse(params.max_date);
            }

            /**
             * Maximal approved date
             *
             * @private
             */
            this._max = params.max_date;

            /**
             * Dates, saved between the calendar calls
             *
             * @private
             */
            this._data = {
                prev : null,
                curr : null,
                next : null
            };

            /**
             * Nodes list
             *
             * @private
             */
            this._nodes = {
                days   : null,
                prev   : null,
                next   : null,
                week   : null,
                items  : {
                    alias   : '',
                    list    : [],
                    chosen  : null,
                    clicked : null
                },
                block  : null,
                field  : field,
                target : target
            };

            // Setup the date in field by the default
            if (this._nodes.field && params.default_stdout) {
                if (typeof params.default_stdout == 'string') {
                    params.default_stdout = Cal.parse(params.default_stdout);
                }

                this._nodes.field[this._way] = this._tmpl(
                    params.tmpl.stdout,
                    Cal.human(params.default_stdout)
                );

                if (params.mirror) {
                    params.mirror[this._way] = this._tmpl(
                        params.tmpl.mirror,
                        Cal.human(params.default_stdout)
                    );
                }
            }

            /**
             * Another calendar instance, which is tangled with this instance
             *
             * @private
             */
            this._tangled = null;

            /**
             * All registered event handlers
             *
             * @private
             */
            this._events = [];

            /**
             * Offset coordinates of the field
             *
             * @private
             */
            if (!params.offset_ignore) {
                this._offset = this._offsetize(
                    this._nodes.field,
                    this._nodes.target
                );
            }

            /**
             * Saved user params
             *
             * @private
             */
            this._params = {};

            for (alias in params) {
                if (alias != 'lang') {
                    this._params[alias] = params[alias];
                }
            }

            /**
             * Saved user handlers
             *
             * @private
             */
            this._handlers = handlers;

            // So let`s start
            this._install();

            return this;
        }