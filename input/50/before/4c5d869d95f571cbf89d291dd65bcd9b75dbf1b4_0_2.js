function() {
                animationController.play();
                animReverse.set('checked', false);
                animPause.set('checked', true);
                animPlay.set('checked', false);
                updateSpeedIndicator();
            }