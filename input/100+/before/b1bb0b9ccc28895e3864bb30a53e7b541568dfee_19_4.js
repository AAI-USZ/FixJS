function(fromValue, callback) {
        var toValue = this.scrollTop;
        if (this.$animatedScroll && Math.abs(fromValue - toValue) < 100000) {
            var _self = this;
            var steps = _self.$calcSteps(fromValue, toValue);
            this.$inScrollAnimation = true;
            
            clearInterval(this.$timer);

            _self.session.setScrollTop(steps.shift());
            this.$timer = setInterval(function() {
                if (steps.length) {
                    _self.session.setScrollTop(steps.shift());
                    // trick session to think it's already scrolled to not loose toValue
                    _self.session.$scrollTop = toValue;
                } else {
                    _self.$inScrollAnimation = false;
                    clearInterval(_self.$timer);
                    
                    _self.session.$scrollTop = -1;
                    _self.session.setScrollTop(toValue);
                    callback && callback();
                }
            }, 10);
        }
    }