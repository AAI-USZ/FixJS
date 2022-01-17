function (cfg) {
        /*jslint evil: true */
        var config = {}, buildFileContents, buildFileConfig, mainConfig,
            mainConfigFile, mainConfigPath, prop, buildFile, absFilePath;

        //Make sure all paths are relative to current directory.
        absFilePath = file.absPath('.');
        build.makeAbsConfig(cfg, absFilePath);
        build.makeAbsConfig(buildBaseConfig, absFilePath);

        lang.mixin(config, buildBaseConfig);
        lang.mixin(config, cfg, true);

        if (config.buildFile) {
            //A build file exists, load it to get more config.
            buildFile = file.absPath(config.buildFile);

            //Find the build file, and make sure it exists, if this is a build
            //that has a build profile, and not just command line args with an in=path
            if (!file.exists(buildFile)) {
                throw new Error("ERROR: build file does not exist: " + buildFile);
            }

            absFilePath = config.baseUrl = file.absPath(file.parent(buildFile));

            //Load build file options.
            buildFileContents = file.readFile(buildFile);
            try {
                buildFileConfig = eval("(" + buildFileContents + ")");
                build.makeAbsConfig(buildFileConfig, absFilePath);

                //Mix in the config now so that items in mainConfigFile can
                //be resolved relative to them if necessary, like if appDir
                //is set here, but the baseUrl is in mainConfigFile. Will
                //re-mix in the same build config later after mainConfigFile
                //is processed, since build config should take priority.
                mixConfig(config, buildFileConfig);
            } catch (e) {
                throw new Error("Build file " + buildFile + " is malformed: " + e);
            }
        }

        mainConfigFile = config.mainConfigFile || (buildFileConfig && buildFileConfig.mainConfigFile);
        if (mainConfigFile) {
            mainConfigFile = build.makeAbsPath(mainConfigFile, absFilePath);
            if (!file.exists(mainConfigFile)) {
                throw new Error(mainConfigFile + ' does not exist.');
            }
            try {
                mainConfig = parse.findConfig(mainConfigFile, file.readFile(mainConfigFile));
            } catch (configError) {
                throw new Error('The config in mainConfigFile ' +
                        mainConfigFile +
                        ' cannot be used because it cannot be evaluated' +
                        ' correctly while running in the optimizer. Try only' +
                        ' using a config that is also valid JSON, or do not use' +
                        ' mainConfigFile and instead copy the config values needed' +
                        ' into a build file or command line arguments given to the optimizer.');
            }
            if (mainConfig) {
                mainConfigPath = mainConfigFile.substring(0, mainConfigFile.lastIndexOf('/'));

                //Add in some existing config, like appDir, since they can be
                //used inside the mainConfigFile -- paths and baseUrl are
                //relative to them.
                if (config.appDir && !mainConfig.appDir) {
                    mainConfig.appDir = config.appDir;
                }

                //If no baseUrl, then use the directory holding the main config.
                if (!mainConfig.baseUrl) {
                    mainConfig.baseUrl = mainConfigPath;
                }

                build.makeAbsConfig(mainConfig, mainConfigPath);
                mixConfig(config, mainConfig);
            }
        }

        //Mix in build file config, but only after mainConfig has been mixed in.
        if (buildFileConfig) {
            mixConfig(config, buildFileConfig);
        }

        //Re-apply the override config values. Command line
        //args should take precedence over build file values.
        mixConfig(config, cfg);

        //Set final output dir
        if (config.hasOwnProperty("baseUrl")) {
            if (config.appDir) {
                config.dirBaseUrl = build.makeAbsPath(config.originalBaseUrl, config.dir);
            } else {
                config.dirBaseUrl = config.dir || config.baseUrl;
            }
            //Make sure dirBaseUrl ends in a slash, since it is
            //concatenated with other strings.
            config.dirBaseUrl = endsWithSlash(config.dirBaseUrl);
        }

        //Check for errors in config
        if (config.main) {
            throw new Error('"main" passed as an option, but the ' +
                            'supported option is called "name".');
        }
        if (!config.name && !config.modules && !config.include && !config.cssIn) {
            throw new Error('Missing either a "name", "include" or "modules" ' +
                            'option');
        }
        if (config.cssIn && !config.out) {
            throw new Error("ERROR: 'out' option missing.");
        }
        if (!config.cssIn && !config.baseUrl) {
            //Just use the current directory as the baseUrl
            config.baseUrl = './';
        }
        if (!config.out && !config.dir) {
            throw new Error('Missing either an "out" or "dir" config value. ' +
                            'If using "appDir" for a full project optimization, ' +
                            'use "dir". If you want to optimize to one file, ' +
                            'use "out".');
        }
        if (config.appDir && config.out) {
            throw new Error('"appDir" is not compatible with "out". Use "dir" ' +
                            'instead. appDir is used to copy whole projects, ' +
                            'where "out" is used to just optimize to one file.');
        }
        if (config.out && config.dir) {
            throw new Error('The "out" and "dir" options are incompatible.' +
                            ' Use "out" if you are targeting a single file for' +
                            ' for optimization, and "dir" if you want the appDir' +
                            ' or baseUrl directories optimized.');
        }

        if (config.insertRequire && !lang.isArray(config.insertRequire)) {
            throw new Error('insertRequire should be a list of module IDs' +
                            ' to insert in to a require([]) call.');
        }

        if ((config.name || config.include) && !config.modules) {
            //Just need to build one file, but may be part of a whole appDir/
            //baseUrl copy, but specified on the command line, so cannot do
            //the modules array setup. So create a modules section in that
            //case.
            config.modules = [
                {
                    name: config.name,
                    out: config.out,
                    include: config.include,
                    exclude: config.exclude,
                    excludeShallow: config.excludeShallow,
                    insertRequire: config.insertRequire
                }
            ];
        } else if (config.modules && config.out) {
            throw new Error('If the "modules" option is used, then there ' +
                            'should be a "dir" option set and "out" should ' +
                            'not be used since "out" is only for single file ' +
                            'optimization output.');
        } else if (config.modules && config.name) {
            throw new Error('"name" and "modules" options are incompatible. ' +
                            'Either use "name" if doing a single file ' +
                            'optimization, or "modules" if you want to target ' +
                            'more than one file for optimization.');
        }

        if (config.out && !config.cssIn) {
            //Just one file to optimize.

            //Does not have a build file, so set up some defaults.
            //Optimizing CSS should not be allowed, unless explicitly
            //asked for on command line. In that case the only task is
            //to optimize a CSS file.
            if (!cfg.optimizeCss) {
                config.optimizeCss = "none";
            }
        }

        //Create a hash lookup for the stubModules config to make lookup
        //cheaper later.
        if (config.stubModules) {
            config.stubModules._byName = {};
            config.stubModules.forEach(function (id) {
                config.stubModules._byName[id] = true;
            });
        }

        //Get any wrap text.
        try {
            if (config.wrap) {
                if (config.wrap === true) {
                    //Use default values.
                    config.wrap = {
                        start: '(function () {',
                        end: '}());'
                    };
                } else {
                    config.wrap.start = config.wrap.start ||
                            file.readFile(build.makeAbsPath(config.wrap.startFile, absFilePath));
                    config.wrap.end = config.wrap.end ||
                            file.readFile(build.makeAbsPath(config.wrap.endFile, absFilePath));
                }
            }
        } catch (wrapError) {
            throw new Error('Malformed wrap config: need both start/end or ' +
                            'startFile/endFile: ' + wrapError.toString());
        }

        //Do final input verification
        if (config.context) {
            throw new Error('The build argument "context" is not supported' +
                            ' in a build. It should only be used in web' +
                            ' pages.');
        }

        //Set file.fileExclusionRegExp if desired
        if (config.hasOwnProperty('fileExclusionRegExp')) {
            if (typeof config.fileExclusionRegExp === "string") {
                file.exclusionRegExp = new RegExp(config.fileExclusionRegExp);
            } else {
                file.exclusionRegExp = config.fileExclusionRegExp;
            }
        } else if (config.hasOwnProperty('dirExclusionRegExp')) {
            //Set file.dirExclusionRegExp if desired, this is the old
            //name for fileExclusionRegExp before 1.0.2. Support for backwards
            //compatibility
            file.exclusionRegExp = config.dirExclusionRegExp;
        }

        //Remove things that may cause problems in the build.
        delete config.jQuery;

        return config;
    }