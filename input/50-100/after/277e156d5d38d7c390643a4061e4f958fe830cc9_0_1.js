function(xhr) {
                    // console.log('error, repoll', xhr);

                    if (xhr.statusText == 'abort') {
                        console.log('-> repoll by function');
                        _this.poll();
                    } else {
                        // force passing the right 'this'
                        _this.errorSleepTime += 1000;
                        panelView.status('Connection interrupted, reconnect in ' + _this.errorSleepTime / 1000 + 's',
                            0, 'warning');
                        console.log("Unexpected poll error; sleeping for", _this.errorSleepTime, "ms");
                        // (function () {
                        //     window.setTimeout(_this.poll, _this.errorSleepTime);
                        // }).call(_this);
                        setTimeout($.proxy(_this.poll, _this), _this.errorSleepTime);
                    }
                }