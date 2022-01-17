function (options) {
            $.fn.animatedanchor.options = $.extend({},  $.fn.animatedanchor.defaults, options);
            var options = $.fn.animatedanchor.options;
            var hash = window.location.hash;
            
            if(hash != "") {
                hash = hash.replace('#_', '#');
                methods.scrollTo($(hash));
            } else {
                $('html,body').animate({scrollTop: 0}, options.delay, options.easing);
            }

            return this.each(function(){
                $(this).bind('click', methods.click);
           });
        }