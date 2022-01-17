function cleanRequireCache() {

    var moduleName,

        modulePath;



    for (moduleName in testModules) {

        if (testModules.hasOwnProperty(moduleName)) {

            modulePath = testModules[moduleName];

            delete require.cache[modulePath];

        }

    }

}