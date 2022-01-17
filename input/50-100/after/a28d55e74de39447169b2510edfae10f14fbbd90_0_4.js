function(mode) {
        if (mode != this.flightMode) {
            this.flightMode = mode;
            this.flightModeDisplay.setText(mode);
            this.flightModeRect.setWidth(this.flightModeDisplay.getBoxWidth());
            this.flightModeRect.setAlpha(1.0);
            this.flightModeRect.show();
            this.flightModeRect.transitionTo({
                alpha: 0.0,
                duration: 10,
                easing: 'ease-out'
            });
        }
    }