function(exists) {
        if (exists) {
            var CtrModule = require(controllerPath);
    
            var controller = new CtrModule();
            if (controller.validate(app.action)) {
                if (controller[app.action]) {
                    //set controller view
                    var view = new View(app.view);
                    view.setPath(app.viewPath);
                    controller.view = view;

                    //set controller request & response
                    var requestWrapper = require("./request");
                    var responseWrapper = require("./response");
                    controller.req = new requestWrapper;
                    controller.res = new responseWrapper;
                    controller[app.action]();
                } else {
                    res.notFound();
                }
            } else {
                res.forbidden();
            }
        } else {
            res.notFound();
        }
    }