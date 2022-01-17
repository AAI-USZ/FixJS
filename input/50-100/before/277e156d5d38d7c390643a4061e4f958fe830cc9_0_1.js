function(xhr) {
                    // console.log('error, repoll', xhr);

                    if (xhr.statusText == 'abort') {
                        console.log('-> poll in error');
                        _this.poll();
                    } else {
                        // force passing the right 'this'
                        _this.errorSleepTime += 1000;
                        console.log("Unexpected poll error; sleeping for", _this.errorSleepTime, "ms");
                        (function () {
                            window.setTimeout(_this.poll, _this.errorSleepTime);
                        }).call(_this);
                    }
                }