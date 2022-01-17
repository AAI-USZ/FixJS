function(e, $promos) {
        if($('#learn-more').hasClass('video')) { // Is the video available?
            var starter = $('#starter').closest('.panel'),
            s_panel = $('<li>', {'class': 'panel'}),
            s_div = $('<div>', {'class': 'feature promo', 'id': 'addon-video-promo'}),
            s_title = $('<h2>', {'text': 'First time with Add-ons?'}),
            s_sub = $('<h3>', {'text': 'Check out our interactive video to learn about some of the awesome things you can do with add-ons!'}),
            s_button = $('<a>', {'html': '<strong>Watch</strong> the Video', 'href': '#'}),
            s_button_span = $('<span>', {'class': 'vid-button view-button'}),
            s_guy = $('<div>', {'class': 'vid-guy'});

            starter.replaceWith(s_panel);
            s_panel.append(s_div);
            s_div.append(s_title);
            s_div.append(s_sub);
            s_button_span.append(s_button);
            s_div.append(s_button_span);
            s_div.append(s_guy);
        } else if (z.has_addons) {
            // Show "Starter Pack" panel only if user has fewer than 3 extensions.
            $('#starter').closest('.panel').remove();
        }
        // Set up the promo carousel.
        $promos.fadeIn('slow').addClass('js').zCarousel({
            btnNext: '#promos .nav-next a',
            btnPrev: '#promos .nav-prev a',
            circular: true
        });
        initTrunc();
        // Initialize install button.
        $('.install', $promos).installButton();
        var $disabled = $('.disabled, .concealed', $promos);
        if ($disabled.length) {
            $disabled.closest('.wrap').addClass('hide-install');
        }
    }