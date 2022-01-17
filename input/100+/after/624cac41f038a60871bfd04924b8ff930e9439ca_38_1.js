function($clickedEl) {
            var personinfoTop = $clickedEl.offset().top + $clickedEl.height();
            var personinfoLeft = $clickedEl.offset().left + $clickedEl.width() / 2 - 125;

            $personinfo_widget.css({
                top: personinfoTop,
                left: personinfoLeft
            });

            $personinfo_widget.jqmShow();
        }