function() {
            var self = this;
            
            if (!self.flags['bouncing_callout']) {
                $('.NB-callout-ftux-signup .NB-callout-text').text('Signup');
                $('.NB-callout-ftux-signup').corner('5px');
                $('.NB-callout-ftux-signup').css({
                    'opacity': 0,
                    'display': 'block'
                }).animate({
                    'opacity': 1,
                    'bottom': 36
                }, {
                    'duration': 750,
                    'easing': 'easeInOutQuint'
                }).each(function() {
                    var $this = $(this);
                        self.flags['bouncing_callout'] = setInterval(function() {
                            $this.animate({'bottom': '+=2px'}, {'duration': 200, 'easing': 'easeInOutQuint'})
                                 .animate({'bottom': '+=0px'}, {'duration': 50})
                                 .animate({'bottom': '-=2px'}, {'duration': 200, 'easing': 'easeInOutQuint'});
                        }, 10000);
                });
            }
        }