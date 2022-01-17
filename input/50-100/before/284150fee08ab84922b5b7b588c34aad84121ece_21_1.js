function(){

        // Do we have the timeseries panel? add it
        if (this.options.showAllTimeseries){
            this.allTimeseriesPanel = new pvc.AllTimeseriesPanel(this, this.basePanel, {
                anchor: this.options.allTimeseriesPosition,
                allTimeseriesSize: this.options.allTimeseriesSize
            });
        }
    }