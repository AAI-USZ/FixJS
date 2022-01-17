function () {
        s = jasmine.createSpy("success");
        e = jasmine.createSpy("error");
        exec.reset();
        geo.lastPosition = null; // reset the cached position
    }