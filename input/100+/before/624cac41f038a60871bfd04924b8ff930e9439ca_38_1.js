function($clickedEl) {
            var personinfoTop = $clickedEl.offset().top + $clickedEl.height();
            var personinfoLeft = $clickedEl.offset().left + $clickedEl.width() / 2 - 125;

            var adjustHeight = 0;
            if (sakai.config.enableBranding && $('.branding_widget').is(':visible')) {
                adjustHeight = parseInt($('.branding_widget').height(), 10) * -1;
            }

            $personinfo_widget.css({
                top: personinfoTop + adjustHeight,
                left: personinfoLeft
            });

            $personinfo_widget.jqmShow();
        }