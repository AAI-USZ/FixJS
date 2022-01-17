function () {
                    execCb = jasmine.createSpy('execCb');
                    reqContext = {
                        execCb:execCb,
                        registry:{
                            someModId:{}
                        }
                    };
                    globals.require = function () {
                    };
                    globals.require.s = {
                        contexts:{
                            '_':reqContext
                        }
                    };
                    ready = jasmine.createSpy('ready');
                    globals.jQuery = {
                        readyWait:0,
                        ready:ready
                    };
                    listener = jasmine.createSpy('listener');
                    loadEventSupport.addBeforeLoadListener(listener);
                }