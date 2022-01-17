function () {
        spyOn(window, "setInterval").andReturn(1);
        spyOn(window, "clearInterval");
    }