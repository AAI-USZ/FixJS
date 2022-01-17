function () {
                    globals.jQuery.readyWait = 1;
                    globals.jQuery.isReady = true;
                    globals.document.addEventListener.mostRecentCall.args[1]();
                    expect(listener).not.toHaveBeenCalled();
                    reqContext.execCb('someModId');
                    expect(execCb).toHaveBeenCalledWith('someModId');
                    expect(listener).not.toHaveBeenCalled();
                    globals.jQuery.ready();
                    expect(listener).toHaveBeenCalled();
                }