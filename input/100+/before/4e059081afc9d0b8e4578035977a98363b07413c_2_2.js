function () {
                var listener, reqContext, execCb, ready;
                beforeEach(function () {
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
                });
                it("should wait for the last call to req.execCb when jquery is already ready", function () {
                    globals.document.addEventListener.mostRecentCall.args[1]();
                    expect(listener).not.toHaveBeenCalled();
                    reqContext.execCb('someModId');
                    expect(execCb).toHaveBeenCalledWith('someModId');
                    expect(listener).toHaveBeenCalled();
                });
                it("should wait for jQuery.ready after the last call to req.execCb when jquery is not ready then", function () {
                    globals.jQuery.readyWait = 1;
                    globals.jQuery.isReady = true;
                    globals.document.addEventListener.mostRecentCall.args[1]();
                    expect(listener).not.toHaveBeenCalled();
                    reqContext.execCb('someModId');
                    expect(execCb).toHaveBeenCalledWith('someModId');
                    expect(listener).not.toHaveBeenCalled();
                    globals.jQuery.ready();
                    expect(listener).toHaveBeenCalled();
                });
            }