function(e) {
                    this.options.stacked = !this.options.stacked
                    setStacked(this.chart, this.options.stacked)
                    if (this.options.stacked) {
                        // tell percentiles95Toggler to be unchecked
                        if (this.options.percentile95) {
                            this.percentile95Toggler.fireEvent('click');
                        }
                        this.percentile95Toggler.set('disabled', true);
                    } else {
                        this.percentile95Toggler.set('disabled', false);
                        e.target.form.fireEvent('submit', e)
                    }
                }