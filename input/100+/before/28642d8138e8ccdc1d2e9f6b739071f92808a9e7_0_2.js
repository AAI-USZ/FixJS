function(e) {
            this.picker.show();
            this.height = this.component ? this.component.outerHeight() : this.element.outerHeight();
            this.place();
            $(window).on('resize', $.proxy(this.place, this));
            if (e ) {
                e.stopPropagation();
                e.preventDefault();
            }
            if (!this.isInput) {
                $(document).on('mousedown', $.proxy(this.hide, this));
            }
            this.element.trigger({
                type: 'show',
                date: this.date
            });
        }