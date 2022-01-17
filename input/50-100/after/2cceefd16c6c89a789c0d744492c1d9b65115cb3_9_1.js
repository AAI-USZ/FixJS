function () {
        //Create window object like in DOM and have it act the same way
        GLOBAL.window = GLOBAL;

        //Set up mocking, no need to "spyOn" since spies are included in mock
        GLOBAL.window.webworks = mockedWebworks;

        spyOn(utils, "loadModule").andCallFake(function (module) {
            module = module.replace("blackberry.", "");
            return require(__dirname + "/../../../../" +  module.replace(/local:\/\//, "").replace(/\.js$/, ""));
        });
    }