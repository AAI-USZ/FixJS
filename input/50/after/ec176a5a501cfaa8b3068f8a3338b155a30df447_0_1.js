function () {
                var time = jQuery(this).find('span').data('start');
                player.setCurrentTime(time);
                if (player.pluginType != "flash") {
                    player.play();
                }
                return false;
            }