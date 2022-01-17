function () {
            var cb = jasmine.createSpy();
            event.add("blackberry.system.event", "a", cb);
            event.remove("blackberry.system.event", "a", cb);
            expect(_window.webworks.exec).toHaveBeenCalledWith(undefined, undefined, "blackberry.system.event", "remove", {"eventName": "a"});
        }