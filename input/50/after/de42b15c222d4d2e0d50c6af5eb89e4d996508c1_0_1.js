function () {
        if(this.$tipsy)
            this.$tipsy.remove();
        else {
            window.clearTimeout(this.delaytimer);
            this.delaytimer=null;
        }
        $.removeData(this.$el, 'tooltipsy');
    }