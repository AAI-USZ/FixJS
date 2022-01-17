function() {
                animationController.play();
                animReverse.set('checked', false);
                animPause.set('checked', false);
                animPlay.set('checked', true);
                updateSpeedIndicator();
            }