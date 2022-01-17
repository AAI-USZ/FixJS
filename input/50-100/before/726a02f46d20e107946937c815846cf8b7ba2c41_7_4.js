function () {
            var callback = jasmine.createSpy();
            event.once("blackberry.system.event", "foo", callback);
            event.trigger("foo", '{"id": 1}');
            event.trigger("foo", '{"id": 1}');
            expect(callback).toHaveBeenCalledWith({"id": 1});
            expect(callback.callCount).toEqual(1);
        }