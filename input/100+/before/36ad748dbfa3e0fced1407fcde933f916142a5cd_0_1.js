function() {
            if (this.options.storeDimensions === true) {
                this.store = ZOOLU.STORE.Cookie.getInstance();
                log('PANEL.' + this.orientation + '.height', this.store.get('PANEL.' + this.orientation + '.height'));
                log('PANEL.' + this.orientation + '.width', this.store.get('PANEL.' + this.orientation + '.width'));
            }
            this.applyStoredDimensions();

            this.$handler = $('<div class="handler"/>');
            this.$handler.appendTo(this.$element);
            this.$handlerCursor = this.$handler.css('cursor');
            this.addMinimizer(this.$handler, this.options.minimizeOrientations);

            this.$minimizer.click(function(event) {
                event.stopPropagation();
                if (this.closed === false) {
                    this.$handler.trigger('Layout.Panel.minimize');
                    this.minimize();
                } else {
                    this.$handler.trigger('Layout.Panel.maximize');
                    this.maximize(this.tmpHeight);
                }
            }.bind(this));

            this.$handler.mousedown(function() {
                this.$handler.on('Layout.Panel.minimize', this.minimize());
                this.$handler.on('Layout.Panel.maximize', this.maximize(this.tmpHeight));
            }.bind(this));
            this.$handler.mouseup(function() {
                this.$handler.off('Layout.Panel.minimize');
                this.$handler.off('Layout.Panel.maximize');
            }.bind(this));

            this.toggleHandlerEvents();

        }