function() {
            $('#inserterbar_more_widgets_container .s3d-outer-shadow-container', $rootel).jcarousel({
                animation: 'slow',
                easing: 'swing',
                scroll: 4,
                itemFirstInCallback: carouselBinding,
                itemFallbackDimension: 4
            });

            $inserterbarMoreWidgetsContainer.hide();
        }