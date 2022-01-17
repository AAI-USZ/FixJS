function(params) {
            var $node = this.$node, options = this.options, self = this;
            if(this.shown) {
                return;
            } else if(!this.constructed) {
                this._constructMenu();
                if(!this.constructed) {
                    return;
                }
            }

            var width = null;
            if(options.width instanceof Widget) {
                width = Widget.measureMatchingWidth($node, options.width.$node);
            } else if(options.width != null) {
                width = options.width;
            }
            if(width != null) {
                $node.width(width);
            }

            var position = null;
            if(params != null && params.position != null) {
                position = params.position;
            } else if(options.position) {
                position = options.position;
            }
            if(position != null) {
                this.place(position);
            }

            if($.isArray(options.animation)) {
                $node.show.apply($node, options.animation);
            } else {
                $node.show();
            }

            $node.addClass('open');
            self.shown = true;
            self.trigger('show');
            return this;
        }