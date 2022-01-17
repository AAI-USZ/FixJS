function () {
                var listener, reqContext, execCb, holdReady;
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
                    holdReady = jasmine.createSpy('holdReady');
                    globals.jQuery = {
                        readyWait:0,
                        holdReady:holdReady
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
                    globals.jQuery.holdReady(false);
                    expect(listener).toHaveBeenCalled();
                });
            }