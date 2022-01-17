function () {
            var callback = jasmine.createSpy(),
                callback2 = jasmine.createSpy();
            event.add("blackberry.system.event", "foo", callback);
            event.add("blackberry.system.event", "foo", callback2);
            expect(_window.webworks.exec).toHaveBeenCalledWith(undefined, undefined, "blackberry.system.event", "add", {"eventName": "foo"});
            expect(_window.webworks.exec.callCount).toEqual(1);
            event.remove("blackberry.system.event", "foo", callback);
            event.remove("blackberry.system.event", "foo", callback2);
        }