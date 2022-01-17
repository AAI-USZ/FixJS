function () {
                    holdReady = jasmine.createSpy('holdReady');
                    globals.jQuery = {
                        readyWait:0,
                        holdReady:holdReady
                    };
                    listener = jasmine.createSpy('listener');
                    loadEventSupport.addBeforeLoadListener(listener);
                }