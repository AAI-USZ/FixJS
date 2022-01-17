function () {
            onPause = jasmine.createSpy();
            blackberry.event.addEventListener("pause", onPause);
        }