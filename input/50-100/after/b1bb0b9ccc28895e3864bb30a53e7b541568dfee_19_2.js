function() {
                if (steps.length) {
                    _self.session.setScrollTop(steps.shift());
                    // trick session to think it's already scrolled to not loose toValue
                    _self.session.$scrollTop = toValue;
                } else if (toValue != null) {
                    _self.session.$scrollTop = -1;
                    _self.session.setScrollTop(toValue);
                    toValue = null;
                } else {
                    // do this on separate step to not get spurious scroll event from scrollbar
                    _self.$timer = clearInterval(_self.$timer);
                    _self.$inScrollAnimation = false;
                    callback && callback();
                }
            }