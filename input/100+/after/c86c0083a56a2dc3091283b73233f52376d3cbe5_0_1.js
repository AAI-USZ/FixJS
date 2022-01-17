function(el) {
            var ch = 0; // summed height of children
            $('body > *').each(function(i, el) {
                var t = el.tagName.toLowerCase();
                if (t != 'script' && el.id != 'chart' && !$(el).hasClass('tooltip')) {
                    ch += $(el).outerHeight(true);
                }
            });
            // subtract body padding
            //ch += $('body').innerHeight() - $('body').height();
            var m = $('#chart').css('margin-top');
            return $(window).height() - ch - Number(m.substr(0, m.length-2));
        }