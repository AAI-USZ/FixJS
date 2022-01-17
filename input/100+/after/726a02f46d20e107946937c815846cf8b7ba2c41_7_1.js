function () {
            var callback = jasmine.createSpy(),
                callback2 = jasmine.createSpy();
            event.add("blackberry.system.event", "foo", callback);
            event.add("blackberry.system.event", "foo", callback2);
            event.trigger("foo", '[{"id": 1}]');
            expect(callback).toHaveBeenCalledWith({"id": 1});
            expect(callback2).toHaveBeenCalledWith({"id": 1});
            event.remove("blackberry.system.event", "foo", callback);
            event.remove("blackberry.system.event", "foo", callback2);
        }