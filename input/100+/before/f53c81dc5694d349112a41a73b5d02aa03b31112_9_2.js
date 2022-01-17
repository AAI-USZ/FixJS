function(element, options) {
            // allow instantiation without "new" keyword
            if (!this._init) {
                return new plugin(element, options);
            }

            this._element = $(element).data(pluginName, this);

            this.options = $.extend({},
                this.options,
                this._options(),
                options);

            this._create();
            this._init();
        }