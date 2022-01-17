function(evt) {
        var ctl = this.timeManager;
        if(!ctl.timeAgents || !ctl.timeAgents.length) {
            //we don't have any time agents which means we should get rid of the time manager control
            //we will automattically add the control back when a time layer is added via handlers on the
            //playback plugin or the application code if the playback toolbar was not build via the plugin
            ctl.map.removeControl(this.ctl);
            ctl.destroy();
            ctl = null;
        }
        else {
            var oldvals = {
                start : ctl.range[0].getTime(),
                end : ctl.range[1].getTime(),
                resolution : {
                    units : ctl.units,
                    step : ctl.step
                }
            };
            ctl.guessPlaybackRate();
            if(ctl.range[0].getTime() != oldvals.start || ctl.range[1].getTime() != oldvals.end ||
                 ctl.units != oldvals.units || ctl.step != oldvals.step) {
                this.reconfigureSlider(this.buildSliderValues());
                /*
                 if (this.playbackMode == 'ranged') {
                 this.timeManager.incrementTime(this.control.rangeInterval, this.control.units);
                 }
                 */
                this.setThumbStyles();
                this.fireEvent('rangemodified', this, ctl.range);
            }
            if(!this.timeManager.playing){
                this.timeManager.setTime(this.timeManager.range[0]);
            }
        }
    }