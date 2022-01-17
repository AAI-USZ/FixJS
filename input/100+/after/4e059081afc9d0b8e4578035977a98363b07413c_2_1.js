function () {
                var listener, holdReady;
                beforeEach(function () {
                    holdReady = jasmine.createSpy('holdReady');
                    globals.jQuery = {
                        readyWait:0,
                        holdReady:holdReady
                    };
                    listener = jasmine.createSpy('listener');
                    loadEventSupport.addBeforeLoadListener(listener);
                });
                it("should wait for a call to jQuery.holdReady with readyWait===1 after normal jQuery ready after DOMContentLoaded", function () {
                    globals.jQuery.readyWait = 1;
                    globals.jQuery.isReady = true;
                    globals.document.addEventListener.mostRecentCall.args[1]();
                    expect(listener).not.toHaveBeenCalled();
                    globals.jQuery.holdReady(false);
                    expect(listener).toHaveBeenCalled();
                });
                it("should wait for a call to jQuery.ready with readyWait===2 before normal jQuery ready after DOMContentLoaded", function () {
                    globals.jQuery.readyWait = 2;
                    globals.jQuery.isReady = false;
                    globals.document.addEventListener.mostRecentCall.args[1]();
                    expect(listener).not.toHaveBeenCalled();
                    globals.jQuery.holdReady(false);
                    expect(listener).toHaveBeenCalled();
                });
            }