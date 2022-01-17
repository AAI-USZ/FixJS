function (that) {
                                // activating tabs
                                fluid.tabs(that.container.selector + ' ' + that.options.selectors.slidingTabsSelector, {
                                    tabOptions: {
                                        fx: { height: 'toggle' }
                                    }
                                });
                                console.log(that);
                                // restoring pageMode
                                that.events.onPageModeRestore.fire(that.model.selections.pageMode);
                            }