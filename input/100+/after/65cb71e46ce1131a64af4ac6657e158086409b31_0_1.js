function (options) {
        var elements = this;
        options = $.extend({}, defaults, options);

        $(window).scroll(function () {
            var scrolled = $(this).scrollTop();

            elements.each(function () {
                var element = $(this);

                //compute threshold
                var start = element.offset().top - options.approach;
                var end   = start + element.height() + options.overtravel;

                if (scrolled >= start && scrolled <= end) {
                    element.trigger('enter.scrollspy');
                }
                else {
                    element.trigger('leave.scrollspy');
                }
            });
        });

        return this;
    }