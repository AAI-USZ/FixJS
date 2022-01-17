function(el) {
            var ch = 0; // summed height of children
            $('body *').each(function(i, el) {
                var t = el.tagName.toLowerCase();
                if (t != 'script' && el.id != 'chart' && !$(el).hasClass('tooltip')) {
                    ch += $(el).height();
                }
            });
            // subtract body padding
            //ch += $('body').innerHeight() - $('body').height();
            return $(window).height() - ch - 30;
        }