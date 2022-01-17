function () {
                var time = jQuery(this).find('span').data('start');
                player.setCurrentTime(time);
                player.play();
                return false;
            }