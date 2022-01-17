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
                    controller.req = new requestWrapper(app.req);
                    controller.res = new responseWrapper(app.res);
                    controller[app.action]();
                } else {
                    app.res.notFound();
                }
            } else {
                app.res.forbidden();
            }
        } else {
            app.res.notFound();
        }
    }