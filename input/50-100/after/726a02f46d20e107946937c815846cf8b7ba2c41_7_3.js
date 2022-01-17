function () {
            var callback = jasmine.createSpy();
            event.add("blackberry.event", "pause", callback);
            event.trigger("pause", "[1,2,3,4,5]");
            expect(callback).toHaveBeenCalledWith(1, 2, 3, 4, 5);
            event.remove("blackberry.system.event", "foo", callback);
        }