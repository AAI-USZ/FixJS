function () {
            var callback = jasmine.createSpy();
            event.add("blackberry.system.event", "foo", callback);
            event.add("blackberry.system.event", "foo", callback);
            event.trigger("foo", '[{"id": 1}]');
            expect(callback).toHaveBeenCalledWith({"id": 1});
            expect(callback.callCount).toEqual(1);
            event.remove("blackberry.system.event", "foo", callback);
        }