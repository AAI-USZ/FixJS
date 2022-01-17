function(ev) {
            var target = $(ev.target);
            var group = target.closest('.accordion-group');
            var link = group.find('.accordion-heading a:first');
            group.find('button.close').show();
            if (target.data('loaded') === true) { return; }
            if (target.is('.map')) {
                var iframe = $("<iframe src='" + link.attr('href') + "' width='746px' height='370px' frameborder=0 scrolling=no></iframe>");
                target.find('.accordion-inner').html(iframe);
            }
            else {
                target.find('.accordion-inner').load(link.attr('href'));
            }
            target.data('loaded', true);
        }