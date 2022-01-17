function() {
        /*
         * container
         *   \
         *    - form
         *        \
         *         - select
         *             \
         *              - option
         *              |
         *              - option
         */
        var container = $(this.parentElement);
        var form      = this.form = new Element('form', {
            'method': 'get',
            'styles': {
                'text-align': 'right',
            },
            'events': {
                'submit': function(e) {
                    this.requestData = this.form.getElement('select').getSelected()[0].value.parseQueryString()
                    /* Draw everything again. */
                    this.getData();
                }.bind(this)
            }
        });

        /* Select dropdown */
        var select = this.select = new Element('select', {
            'class':  'date timescale',
            'styles': {
                'margin-bottom':    '3px',
                'border':           '1px solid #aaa',
            },
            'events': {
                'change': function(e) {
                    e.target.form.fireEvent('submit', e)
                }
            }
        });


        timeframe = this.options.timeframe;
        this.timeframes.each(function(time, label) {
            var value  = Object.toQueryString(time);
            var option = new Element('option', {
                'html':     label,
                'value':    value,
                'selected': label == timeframe,
            });
            select.grab(option)
        });

        var liveToggler = this.liveToggler = new Element('input', {
            'type': 'checkbox',
            'id':   this.parentElement + '-live',
            'name': 'live',
            'checked': this.options.live,
            'disabled': this.options.percentile95,
            'events': {
                'click': function(e) {
                    this.options.live = !this.options.live
                    if (this.options.live) {
                        // tell percentiles95Toggler to be unchecked
                        if (this.options.percentile95) {
                            this.percentile95Toggler.fireEvent('click');
                        }
                        this.percentile95Toggler.set('disabled', true);
                    } else {
                        this.requestData.live = false;
                        this.percentile95Toggler.set('disabled', false);
                        e.target.form.fireEvent('submit', e)
                    }
                }.bind(this)
            },
            'styles': {
                'margin-right': '4px',
                'cursor': 'pointer'
            }
        });

        var stackedToggler = this.stackedToggler = new Element('input', {
            'type': 'checkbox',
            'id': this.parentElement + '-stacked',
            'name': 'stacked',
            'checked': this.options.stacked,
            'disabled': this.options.percentile95,
            'events': {
                'click': function(e) {
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
                }.bind(this)
            },
            'styles': {
                'margin-right': '4px',
                'cursor': 'pointer'
            }
        });

        var liveLabel = new Element('label', {
            'for': this.parentElement + '-live',
            'html': 'Live',
            'styles': {
                'font-family': 'sans-serif',
                'font-size':   '11px',
                'margin-right': '8px',
                'cursor': 'pointer'
            }
        });

        var percentile95Toggler = this.percentile95Toggler = new Element('input', {
            'type': 'checkbox',
            'id':   this.parentElement + '-percentile95',
            'name': 'percentile95',
            'checked': this.options.percentile95,
            'events': {
                'click': function() {
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
                        console.log(this.liveToggler);
                        this.liveToggler.set('disabled', true);
                        // tell stackedToggler to be unchecked
                        if (this.options.stacked) {
                            this.stackedToggler.fireEvent('click');
                        }
                        console.log(this.stackedToggler);
                        this.stackedToggler.set('disabled', true);
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
                        this.stackedToggler.set('disabled', false);
                    }
                }.bind(this)
            },
            'styles': {
                'margin-right': '4px',
                'cursor': 'pointer'
            }
        });

        var percentile95Label = new Element('label', {
            'for': this.parentElement + '-percentile95',
            'html': '95th Percentile',
            'styles': {
                'font-family': 'sans-serif',
                'font-size':   '11px',
                'margin-right': '8px',
                'cursor': 'pointer'
            }
        });

        var stackedLabel = new Element('label', {
            'for': this.parentElement + '-stacked',
            'html': 'Stacked',
            'styles': {
                'font-family': 'sans-serif',
                'font-size': '11px',
                'margin-right': '8px',
                'cursor': 'pointer'
            }
        });

        var exportLink = new Element('a', {
            'href': this.dataURL(),
            'html': 'Export data',
            'styles': {
                'font-family':  'sans-serif',
                'font-size':    '11px',
                'margin-right': '8px',
                'color':        '#2F5A92',
            },
            'events': {
                'mouseover': function(e) {
                    e.stop();
                    var url      = e.target.get('href'),
                        extremes = this.chart.xAxis[0].getExtremes(),
                        options  = { 'start':  extremes.dataMin,
                                     'finish': parseInt(extremes.dataMax) };

                    var options = new Hash(options).toQueryString(),
                        baseurl = this.dataURL(),
                        url     = baseurl += '?' + options;

                    e.target.set('href', url)
                }.bind(this)
            }
        });

        form.grab(exportLink)
        form.grab(percentile95Toggler)
        form.grab(percentile95Label)
        form.grab(liveToggler)
        form.grab(liveLabel)
        form.grab(stackedToggler)
        form.grab(stackedLabel)
        form.grab(select)
        container.grab(form, 'top')
    }