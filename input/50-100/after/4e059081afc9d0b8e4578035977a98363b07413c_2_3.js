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
                    holdReady = jasmine.createSpy('holdReady');
                    globals.jQuery = {
                        readyWait:0,
                        holdReady:holdReady
                    };
                    listener = jasmine.createSpy('listener');
                    loadEventSupport.addBeforeLoadListener(listener);
                }