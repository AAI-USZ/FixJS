function() {
            this.hide_mouse_indicator();
            this.$s.$content_pane
                .unbind('mouseleave.reader')
                .bind('mouseleave.reader', $.rescope(this.hide_mouse_indicator, this));
            this.$s.$content_pane
                .unbind('mouseenter.reader')
                .bind('mouseenter.reader', $.rescope(this.show_mouse_indicator, this));
        }