function(xhr) {
                    // console.log('error, repoll', xhr);

                    if (xhr.statusText == 'abort') {
                        console.log('-> repoll by function');
                        _this.poll();
                    } else {
                        if (xhr.responseText) console.log('Poll error:', $.parseJSON(xhr.responseText).error);

                        _this.errorSleepTime += 1000;
                        panelView.status('Connection interrupted, reconnect in ' + _this.errorSleepTime / 1000 + 's',
                            0, 'warning');
                        setTimeout($.proxy(_this.poll, _this), _this.errorSleepTime);
                    }
                }