function(e) {
            e.stopPropagation();
            e.preventDefault();

            this.$element.trigger('show');

            $('html').on('click.timepicker.data-api', $.proxy(this.hide, this));

            if (true === this.disableFocus) {
                this.$element.blur();
            }

            var pos = $.extend({}, this.$element.offset(), {
                height: this.$element[0].offsetHeight
            });

            if (this.options.template === 'modal') {
                this.$widget.modal('show');
            } else {
                this.$widget.css({
                    top: pos.top + pos.height
                    , left: pos.left
                })

                if (!this.open) {
                    this.$widget.addClass('open');
                }
            }

            this.open = true;
            this.$element.trigger('shown');

            return this;
        }