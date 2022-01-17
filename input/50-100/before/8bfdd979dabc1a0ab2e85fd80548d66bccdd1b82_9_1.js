function cleanRequireCache() {

    var moduleName,

        modulePath;



    for (moduleName in testModules) {

        if (testModules.hasOwnProperty(moduleName)) {

            modulePath = testModules[moduleName];

            if (typeof window === "undefined") {

                delete require.cache[modulePath];

            } else {

                if (typeof window.browserifyRequire.modules[modulePath]._cached === "object") {

                    delete window.browserifyRequire.modules[modulePath]._cached;

                }

            }

        }

    }

}