function tapHandler(e){

            // Grab the target element
            var $el = $(e.target);

            // Find the nearest tappable ancestor
            if (!$el.is(touchSelectors.join(', '))) {
                $el = $el.closest(touchSelectors.join(', '));
            }

            // Make sure we have a tappable element
            if (!$el.length || !$el.prop('href')) {
                warn('Could not find a link related to tapped element');
                return false;
            }

            // Init some vars
            var target = $el.attr('target'),
                hash = $el.prop('hash'),
                href = $el.prop('href'),
                animation = null;

            if ($el.isExternalLink()) {
                $el.unselect();
                return true;

            } else if ($el.is(jQTSettings.backSelector)) {
                // User clicked or tapped a back button
                goBack(hash);

            } else if ($el.is(jQTSettings.submitSelector)) {
                // User clicked or tapped a submit element
                submitParentForm($el);

            } else if (target === '_webapp') {
                // User clicked or tapped an internal link, fullscreen mode
                window.location = href;
                return false;

            } else if (href === '#') {
                // Allow tap on item with no href
                $el.unselect();
                return true;
            } else {
                animation = getAnimation($el);

                if (hash && hash !== '#') {
                    // Internal href
                    $el.addClass('active');
                    goTo($(hash).data('referrer', $el), animation, $el.hasClass('reverse'));
                    return false;
                } else {
                    // External href
                    $el.addClass('loading active');
                    showPageByHref($el.prop('href'), {
                        animation: animation,
                        callback: function() {
                            $el.removeClass('loading');
                            setTimeout($.fn.unselect, 250, $el);
                        },
                        $referrer: $el
                    });
                    return false;
                }
            }
        }