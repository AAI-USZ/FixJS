function() {
            var threshold = 500;
            var scrollTop = $.browser.msie ? $('html').scrollTop() : $(window).scrollTop();
            var pixelsRemainingUntilBottom = $(document).height() - $(window).height() - scrollTop;
            var $finalContainer = $scrollContainer || $container;
            if ($scrollContainer) {
                threshold = 280;
                scrollTop = $scrollContainer.scrollTop();
                pixelsRemainingUntilBottom = $scrollContainer.children('ul').height() - scrollTop;
            }
            if (pixelsRemainingUntilBottom <= threshold && $finalContainer.is(':visible')) {
                parameters.page++;
                loadResultList();
            }
        }