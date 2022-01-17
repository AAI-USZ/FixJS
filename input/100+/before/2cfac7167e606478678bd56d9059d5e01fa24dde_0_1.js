function clickHandler(e) {

            // Figure out whether to prevent default
            var $el = $(e.target);

            // Find the nearest tappable ancestor
            if (!$el.is(touchSelectors.join(', '))) {
                $el = $(e.target).closest(touchSelectors.join(', '));
            }

            // Prevent default if we found an internal link (relative or absolute)
            if ($el && $el.attr('href') && !$el.isExternalLink()) {
                warn('Need to prevent default click behavior');
                e.preventDefault();
            } else {
                warn('No need to prevent default click behavior');
            }

            // Trigger a tap event if touchstart is not on the job
            if ($.support.touch) {
                warn('Not converting click to a tap event because touch handler is on the job');
            } else {
                warn('Converting click event to a tap event because touch handlers are not present or off');
                $(e.target).trigger('tap', e);
            }

        }