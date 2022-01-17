function updateSpeedIndicator() {
        if (animationController.isAnimating()) {
            speedIndicatorElement.innerHTML = clock.multiplier + 'x realtime';
        } else {
            speedIndicatorElement.innerHTML = clock.multiplier + 'x realtime (currently paused)';
        }
    }