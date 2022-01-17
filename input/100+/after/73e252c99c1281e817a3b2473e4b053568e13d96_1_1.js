function() {
        this.$frame.remove();
        this.$frame = this.buildFrame(this.elemHeight(this.$controls));
        this.$root.append(this.$frame);
        $(window).triggerHandler('resize');
    }