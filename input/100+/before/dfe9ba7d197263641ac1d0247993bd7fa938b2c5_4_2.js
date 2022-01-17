function browserifyRewire(parentModulePath, path, cache) {

    var originalModule,

        absPath,

        rewiredExports,

        rewiredModule,

        registryEntry;



    // Default cache to true

    if (cache === undefined) {

        cache = true;

    }



     // Normalize path with file extensions

    absPath = browserifyRequire.resolve(path, parentModulePath);



    // Delete the original module from the cache so the next call to browserifyRequre()

    // executes the module

    delete browserifyRequire.cache[absPath];



    // Require module to trigger rewire.register()

    browserifyRequire(path, parentModulePath);



    // Get registry entry of the target module

    registryEntry = registry[absPath];

    originalModule = registryEntry.module;



    // Make an independent copy of the original module so we can modify the copy

    // without influencing the original module.

    rewiredModule = clone(originalModule);

    rewiredExports = rewiredModule.exports;



    // Apply setter and getters

    rewiredExports.__set__ = registryEntry.setter;

    rewiredExports.__get__ = registryEntry.getter;



    if (cache) {

        browserifyRequire.cache[absPath] = rewiredModule;

    } else {

        browserifyRequire.cache[absPath] = originalModule; // returning originalModule to the cache

    }



    // Store rewired modules for rewire.reset()

    rewiredModules.push(absPath);



    return rewiredExports;

}