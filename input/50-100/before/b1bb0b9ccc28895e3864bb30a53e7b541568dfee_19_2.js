function() {
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
            }