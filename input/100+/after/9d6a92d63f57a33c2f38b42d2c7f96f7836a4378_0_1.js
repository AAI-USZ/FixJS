function(e) {
            e.preventDefault();
            if(connected) {
                alert('Huluwithme is already running!');
                return;
            }

            if($hwm_intro) {
                $hwm_intro.remove();
                window.localStorage['seen-message'] = 1;
            }

            $tab_a.addClass('on');

            var $body = jQuery('body');
            jQuery('.hwm_new').remove();
            $hwm_new_overlay = jQuery('<div>', {'class': 'hwm_new hwm_new_overlay'});
            $hwm_new_modal = jQuery('<div>', {'class': 'hwm_new hwm_new_modal'});
            $body.append($hwm_new_overlay);
            $body.append($hwm_new_modal);

            var $hwm_new_input = jQuery('<input>', {'value': hwm_link});
            var $hwm_new_close = jQuery('<a>', {'text': 'cancel', 'class': 'close', 'href': '#'});

            var $hwm_pg1 = jQuery('<div>', {'class':'page_1'});
            var $hwm_pg2 = jQuery('<div>', {'class':'page_2'});

            var $hwm_next = jQuery('<a>', {'text': 'Next »', 'class': 'button', 'href': '#'});
            $hwm_next.click(function(e) {
                e.preventDefault();
                $hwm_new_modal.addClass('next');
                player.pauseEverything();
            });

            $hwm_new_modal.append(jQuery('<div>', {'id': 'hwm-logo'}));
            $hwm_new_modal.append(jQuery('<p>', {'text': 'Watch your favorite show with your favorite person'}));
            $hwm_pg1.append(jQuery('<label>', {'text': 'Send this link to the person you want to watch with:'}));
            $hwm_pg1.append($hwm_new_input);
            $hwm_pg1.append($hwm_next);

            var $hwm_pg2_back = jQuery('<a>', {'text': 'Need the URL again?', 'href': '#'});
            $hwm_pg2_back.click(function(e) {
                e.preventDefault();
                $hwm_new_modal.removeClass('next');
                $hwm_new_input.focus();
                $hwm_new_input[0].select();
            });

            $hwm_pg2.append(jQuery('<label>', {'text': 'Waiting for the other person to join...'}));
            $hwm_pg2.append($hwm_pg2_back);
            $hwm_pg2.append(jQuery('<div>', {'class': 'load'}));

            $hwm_new_modal.append($hwm_pg1);
            $hwm_new_modal.append($hwm_pg2);

            $hwm_new_modal.append(jQuery('<p>', {'text': 'Your video will start automatically from the beginning when they click the link. We\'ll help them get started if they don\'t have the add-on installed yet.'}));
            $hwm_new_modal.append($hwm_new_close);

            $hwm_new_close.click(close_modal);
            $hwm_new_overlay.click(close_modal);

            jQuery('#player').css('visibility', 'hidden');

            $hwm_new_input.focus();
            $hwm_new_input[0].select();

            $hwm_new_input.focus(function() {
                $hwm_new_input[0].select();
            });

            player.pauseEverything(false, false, 5);

            startHWM();
        }