function () {
            var cb = jasmine.createSpy();
            event.add("blackberry.system.event", "c", cb);
            event.remove("blackberry.system.event", "c", cb);
            event.trigger("c", {"id": 1});
            expect(cb).not.toHaveBeenCalled();
        }