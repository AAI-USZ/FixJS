function () {
                var listener, ready;
                beforeEach(function () {
                    ready = jasmine.createSpy('ready');
                    globals.jQuery = {
                        readyWait:0,
                        ready:ready
                    };
                    listener = jasmine.createSpy('listener');
                    loadEventSupport.addBeforeLoadListener(listener);
                });
                it("should wait for a call to jQuery.ready with readyWait===1 after normal jQuery ready after DOMContentLoaded", function () {
                    globals.jQuery.readyWait = 1;
                    globals.jQuery.isReady = true;
                    globals.document.addEventListener.mostRecentCall.args[1]();
                    expect(listener).not.toHaveBeenCalled();
                    globals.jQuery.ready();
                    expect(listener).toHaveBeenCalled();
                });
                it("should wait for a call to jQuery.ready with readyWait===2 before normal jQuery ready after DOMContentLoaded", function () {
                    globals.jQuery.readyWait = 2;
                    globals.jQuery.isReady = false;
                    globals.document.addEventListener.mostRecentCall.args[1]();
                    expect(listener).not.toHaveBeenCalled();
                    globals.jQuery.ready();
                    expect(listener).toHaveBeenCalled();
                });
            }