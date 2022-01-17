function () {
                    globals.jQuery.readyWait = 1;
                    globals.jQuery.isReady = true;
                    globals.document.addEventListener.mostRecentCall.args[1]();
                    expect(listener).not.toHaveBeenCalled();
                    globals.jQuery.holdReady(false);
                    expect(listener).toHaveBeenCalled();
                }