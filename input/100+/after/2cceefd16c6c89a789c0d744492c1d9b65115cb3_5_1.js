function (req, res) {
        try {
            var pluginName = "lib/plugins/" + req.params.service, 
                plugin,
                params,
                args = {};
            
            if (frameworkModules.indexOf(pluginName + ".js") === -1) {
                pluginName = "lib/plugins/" + DEFAULT_SERVICE;
                req = rebuildRequest(req);
            }

            //Updating because some versions of node only work with relative paths
            pluginName = pluginName.replace('lib', '.');

            plugin = require("./utils").loadModule(pluginName);
            params = req.params.args && req.params.args.split("&");

            if (params) {
                params.forEach(function (param) {
                    var parts = param.split("=");
                    args[parts[0]] = parts[1];
                });
            }

            plugin[req.params.action](req,
            function (result) {
                res.send(200, {
                    code: 1,
                    data: result
                });
            },
            function (code, error, httpCode) {
                if (!httpCode) {
                    httpCode = 200;
                }

                res.send(httpCode, {
                    code: Math.abs(code) * -1 || -1,
                    data: null,
                    msg: error
                });
            },
            args,
            {
                "request": req,
                "response": res
            });
        } catch (e) {
            console.log(e);
            res.send(404, "can't find the stuff");
        }
    }