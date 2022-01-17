function() {
                    this.options.percentile95 = !this.options.percentile95;
                    if (!(this.options.percentiles)) {
                        this.options.percentiles = [];
                    }
                    if (this.options.percentile95) {
                        this.options.percentiles.push('95');
                        if ((this.chart) && (this.series[0].percentile95)) {
                            this.drawPercentiles(this.chart);
                        } else {
                            this.getData();
                        }
                        // tell liveToggler to be unchecked
                        if (this.options.live) {
                            this.liveToggler.fireEvent('click');
                        }
                        this.liveToggler.set('disabled', true);
                    } else {
                        // FIXME - when adding support for 5th and 50th percentiles
                        // etc we'll need to switch the options.percentiles array
                        // to a hash for easy enabling / disabling of percentiles
                        this.options.percentiles = [];
                        if (this.chart) {
                            this.removePercentiles(this.chart);
                        } else {
                            this.getData();
                        }
                        this.liveToggler.set('disabled', false);
                    }
                }