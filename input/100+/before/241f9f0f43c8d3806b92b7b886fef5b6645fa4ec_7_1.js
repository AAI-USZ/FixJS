function () {
        //Set up mocking, no need to "spyOn" since spies are included in mock
        
        GLOBAL.JNEXT = {
            invoke : jasmine.createSpy(),
            require : jasmine.createSpy()
        };
        
        index = require(root + "ext/blackberry.ui.dialog/index");
    }