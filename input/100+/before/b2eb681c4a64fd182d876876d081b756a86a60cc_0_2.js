function () {         
            if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') 
            && location.hostname === this.hostname) {
                var options = $.fn.animatedanchor.options;
                var $target =$(this.hash)
                $target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');

                if ($target.length) {
                    var targetOffset = $target.offset().top - options.offset;

                    $('html,body').animate({scrollTop: targetOffset}, options.delay, options.easing, function () {
                        window.location.hash = "#" + $($target).attr('id');
                    } );
                    return false;
                }
            }
        }