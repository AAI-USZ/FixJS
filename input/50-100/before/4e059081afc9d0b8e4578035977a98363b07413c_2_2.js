function () {
                    globals.jQuery.readyWait = 2;
                    globals.jQuery.isReady = false;
                    globals.document.addEventListener.mostRecentCall.args[1]();
                    expect(listener).not.toHaveBeenCalled();
                    globals.jQuery.ready();
                    expect(listener).toHaveBeenCalled();
                }