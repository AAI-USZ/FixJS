function (that) {
                                // activating tabs
                                fluid.tabs(that.container.selector + ' ' + that.options.selectors.slidingTabsSelector, {
                                    tabOptions: {
                                        fx: { height: 'toggle' }
                                    }
                                });
                            }