function () {
                    ready = jasmine.createSpy('ready');
                    globals.jQuery = {
                        readyWait:0,
                        ready:ready
                    };
                    listener = jasmine.createSpy('listener');
                    loadEventSupport.addBeforeLoadListener(listener);
                }