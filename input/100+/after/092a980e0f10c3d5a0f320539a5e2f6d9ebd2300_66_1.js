function (require, exports, module) {
    "use strict";

    var NativeFileSystem    = require("file/NativeFileSystem").NativeFileSystem,
        FileUtils           = require("file/FileUtils"),
        Async               = require("utils/Async"),
        contexts            = {};
    /**
     * Returns the require.js require context used to load an extension
     *
     * @param {!string} name, used to identify the extension
     * @return {!Object} A require.js require object used to load the extension, or undefined if 
     * there is no require object ith that name
     */
    function getRequireContextForExtension(name) {
        return contexts[name];
    }

    
    /**
     * Loads the extension that lives at baseUrl into its own Require.js context
     *
     * @param {!string} name, used to identify the extension
     * @param {!string} baseUrl, URL path relative to index.html, where the main JS file can be found
     * @param {!string} entryPoint, name of the main js file to load
     * @return {!$.Promise} A promise object that is resolved when the extension is loaded.
     */
    function loadExtension(name, config, entryPoint) {
        var result = new $.Deferred(),
            extensionRequire = brackets.libRequire.config({
                context: name,
                baseUrl: config.baseUrl,
                /* FIXME (issue #1087): can we pass this from the global require context instead of hardcoding twice? */
                paths: {
                    "text" : "../../../thirdparty/text"
                }
            });
        contexts[name] = extensionRequire;

        console.log("[Extension] starting to load " + config.baseUrl);
        
        extensionRequire([entryPoint], function () {
            console.log("[Extension] finished loading " + config.baseUrl);
            result.resolve();
        });
        
        return result.promise();
    }

    /**
     * Runs unit tests for the extension that lives at baseUrl into its own Require.js context
     *
     * @param {!string} name, used to identify the extension
     * @param {!string} baseUrl, URL path relative to index.html, where the main JS file can be found
     * @param {!string} entryPoint, name of the main js file to load
     * @return {!$.Promise} A promise object that is resolved when all extensions complete loading.
     */
    function testExtension(name, config, entryPoint) {
        var result = new $.Deferred(),
            extensionPath = FileUtils.getNativeBracketsDirectoryPath();
        
        // Assumes the caller's window.location context is /test/SpecRunner.html
        extensionPath = extensionPath.replace("brackets/test", "brackets/src"); // convert from "test" to "src"
        extensionPath += "/" + config.baseUrl + "/" + entryPoint + ".js";

        var fileExists = false, statComplete = false;
        brackets.fs.stat(extensionPath, function (err, stat) {
            statComplete = true;
            if (err === brackets.fs.NO_ERROR && stat.isFile()) {
                // unit test file exists
                var extensionRequire = brackets.libRequire.config({
                    context: name,
                    baseUrl: "../src/" + config.baseUrl,
                    paths: config.paths
                });
    
                console.log("[Extension] loading unit test " + config.baseUrl);
                extensionRequire([entryPoint], function () {
                    console.log("[Extension] loaded unit tests " + config.baseUrl);
                    result.resolve();
                });
            } else {
                result.reject();
            }
        });
        
        return result.promise();
    }
    
    /**
     * @private
     * Loads a file entryPoint from each extension folder within the baseUrl into its own Require.js context
     *
     * @param {!string} directory, an absolute native path that contains a directory of extensions.
     *                  each subdirectory is interpreted as an independent extension
     * @param {!string} baseUrl, URL path relative to index.html that maps to the same place as directory
     * @param {!string} entryPoint Module name to load (without .js suffix)
     * @param {function} processExtension 
     * @return {!$.Promise} A promise object that is resolved when all extensions complete loading.
     */
    function _loadAll(directory, config, entryPoint, processExtension) {
        var result = new $.Deferred();
        
        NativeFileSystem.requestNativeFileSystem(directory,
            function (rootEntry) {
                rootEntry.createReader().readEntries(
                    function (entries) {
                        var i,
                            extensions = [];
                        
                        for (i = 0; i < entries.length; i++) {
                            if (entries[i].isDirectory) {
                                // FUTURE (JRB): read package.json instead of just using the entrypoint "main".
                                // Also, load sub-extensions defined in package.json.
                                extensions.push(entries[i].name);
                            }
                        }
                        
                        Async.doInParallel(extensions, function (item) {
                            var extConfig = {
                                baseUrl: config.baseUrl + "/" + item,
                                paths: config.paths
                            };
                            return processExtension(item, extConfig, entryPoint);
                        }).done(function () {
                            result.resolve();
                        }).fail(function () {
                            result.reject();
                        });
                    },
                    function (error) {
                        console.log("[Extension] Error -- could not read native directory: " + directory);
                    }
                );
            },
            function (error) {
                console.log("[Extension] Error -- could not open native directory: " + directory);
            });
        
        return result.promise();
    }
    
    /**
     * Loads the extension that lives at baseUrl into its own Require.js context
     *
     * @param {!string} directory, an absolute native path that contains a directory of extensions.
     *                  each subdirectory is interpreted as an independent extension
     * @param {!string} baseUrl, URL path relative to index.html that maps to the same place as directory
     * @return {!$.Promise} A promise object that is resolved when all extensions complete loading.
     */
    function loadAllExtensionsInNativeDirectory(directory, baseUrl) {
        return _loadAll(directory, {baseUrl: baseUrl}, "main", loadExtension);
    }
    
    /**
     * Runs unit test for the extension that lives at baseUrl into its own Require.js context
     *
     * @param {!string} directory, an absolute native path that contains a directory of extensions.
     *                  each subdirectory is interpreted as an independent extension
     * @param {!string} baseUrl, URL path relative to index.html that maps to the same place as directory
     * @return {!$.Promise} A promise object that is resolved when all extensions complete loading.
     */
    function testAllExtensionsInNativeDirectory(directory, baseUrl) {
        var bracketsPath = FileUtils.getNativeBracketsDirectoryPath(),
            config = {
                baseUrl: baseUrl
            };
        
        config.paths = {
            "perf": bracketsPath + "/perf",
            "spec": bracketsPath + "/spec"
        };
        
        return _loadAll(directory, config, "unittests", testExtension);
    }
    
    exports.getRequireContextForExtension = getRequireContextForExtension;
    exports.loadExtension = loadExtension;
    exports.testExtension = testExtension;
    exports.loadAllExtensionsInNativeDirectory = loadAllExtensionsInNativeDirectory;
    exports.testAllExtensionsInNativeDirectory = testAllExtensionsInNativeDirectory;
}