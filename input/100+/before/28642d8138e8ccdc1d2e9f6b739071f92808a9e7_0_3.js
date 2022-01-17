function(e){
            this.picker.hide();
            $(window).off('resize', this.place);
            this.viewMode = this.startViewMode;
            this.showMode();
            if (!this.isInput) {
                $(document).off('mousedown', this.hide);
            }
            if (e && e.currentTarget.value)
                this.setValue();
            this.element.trigger({
                type: 'hide',
                date: this.date
            });
        }