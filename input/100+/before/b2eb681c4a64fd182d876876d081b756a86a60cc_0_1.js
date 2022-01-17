function (options) {
            $.fn.animatedanchor.options = $.extend({},  $.fn.animatedanchor.defaults, options);
            var hash = window.location.hash;
            alert(hash);
            if(hash) {
                methods.scrollTo($('hash'));
            }

            return this.each(function(){
                $(this).bind('click', methods.click);
           });
        }