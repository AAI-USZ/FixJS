function (callback) {
    var config = assembleLmdConfig(this.configFile, Object.keys(this.flagToOptionNameMap));

    for (var i = 0, c = config.errors.length; i < c; i++) {
        this.warn(config.errors[i]);
    }

    var lazy = config.lazy || false,
        mainModuleName = config.main,
        pack = lazy ? true : typeof config.pack === "undefined" ? true : config.pack,
        moduleContent,
        lmdModules = [],
        sandbox,
        lmdMain,
        lmdFile,
        isJson,
        isModule,
        isPlainModule,
        coverageResult,
        globalsObjects,
        coverageOptions = {},
        is_using_shortcuts = false,
        module,
        modules;

    if (typeof config.ie === "undefined") {
        config.ie = true;
    }

    if (!config.cache && config.cache_async) {
        this.warn('This package was configured with flag **cache_async: true**, but without flag **cache**; ' +
            'cache_async cant work independently. Flag cache_async is disabled! Please switch on **cache**.');
        config.cache_async = false;
    }

    if (config.cache && typeof config.version === "undefined") {
        this.warn('This package was configured with flag **cache: true**, but without flag **version** parameter. ' +
            'Please define **version** to enable cache.');
    }

    if (config.modules) {
        modules = config.modules;
        // build modules string
        for (var index in modules) {
            module = modules[index];
            if (module.is_shortcut) {
                is_using_shortcuts = true;
                if (module.name === mainModuleName) {
                    this.warn('Main module can not be a shortcut. Your app will throw an error.')
                } else {
                    lmdModules.push(this.escape(module.name) + ': ' + this.escape(module.path));
                }
                continue;
            }
            moduleContent = fs.readFileSync(module.path, 'utf8');

            try {
                JSON.parse(moduleContent);
                isJson = true;
            } catch (e) {
                isJson = false;
            }

            if (!isJson) {
                isPlainModule = false;
                try {
                    isPlainModule = this.isPlainModule(moduleContent);
                    isModule = true
                } catch(e) {
                    isModule = false;
                }

                // #12 Warn if parse error in .js file
                if (!isModule && /.js$/.test(module.path)) {
                    this.warn('File "**' + module.path + '**" has extension **.js** and LMD detect an parse error. ' +
                              'This module will be string. Please check the source.');
                }

                if (isModule) {
                    if (module.is_third_party) {
                        // create lmd module from non-lmd module
                        moduleContent = this.wrapNonLmdModule(moduleContent, module.extra_exports, module.extra_require);
                        if (module.extra_require && module.is_sandbox) {
                            this.error('Your module "**' + module.path + '**" have to require() some deps, but it sandboxed. ' +
                                      'Remove sandbox flag to allow module require().');
                        }
                    } else if (isPlainModule) {
                        // wrap plain module
                        moduleContent = this.wrapPlainModule(moduleContent);
                    }
                }

                // #26 Code coverage
                if (isModule && module.is_coverage) {
                    coverageResult = lmdCoverage.interpret(module.name, module.path, moduleContent, isPlainModule ? 0 : 1);
                    coverageOptions[module.name] = coverageResult.options;
                    moduleContent = coverageResult.code;

                    // Check for different require name (first argument)
                    globalsObjects = this.checkForDirectGlobalsAccess(module.path, moduleContent);
                    if (globalsObjects.indexOf('require') !== -1) {
                        this.error("In module **" + module.path + "** you are using different 'require' name. " +
                                   "You must declare first argument of your module-function as 'require' to use coverage!");
                    }
                }

                // #14 Check direct access of globals in lazy modules
                if (this.isWarn && isModule && module.is_lazy) {
                    globalsObjects = this.checkForDirectGlobalsAccess(module.path, moduleContent);

                    if (globalsObjects.length) {
                         this.warn("Lazy module **" + module.path + "** uses some globals directly (" + globalsObjects.join(', ') +  "). " +
                                   "Replace them with require('" + globalsObjects[0] + "') etc");
                    }
                }

                if (isModule && (module.is_lazy || pack)) {
                    moduleContent = this.compress(moduleContent);
                }
            }

            if (module.name === mainModuleName) {
                lmdMain = moduleContent;
            } else {
                if (isModule && !isJson && module.is_lazy) {
                    moduleContent = moduleContent.replace(/^function[^\(]*/, 'function');
                    if (moduleContent.indexOf('(function(') !== 0) {
                        moduleContent = '(' + moduleContent + ')';
                    }
                    moduleContent = this.escape(moduleContent);
                } else if (!isModule) {
                    moduleContent = this.escape(moduleContent);
                }

                lmdModules.push(this.escape(module.name) + ': ' + moduleContent);
            }
        }

        if (is_using_shortcuts && !config.shortcuts) {
            this.warn('Some of your modules are shortcuts, but config flag **shortcuts** is undefined or falsy. ' +
                      'Enable that flag for proper work.');
        }

        if (!is_using_shortcuts && config.shortcuts) {
            this.warn('Config flag **shortcuts** is enabled, but there is no shortcuts in your package. ' +
                      'Disable that flag to optimize your package.');
        }

        if (config.stats_coverage && (config.cache || config.cache_async)) {
            this.warn('LMD will cache your modules under code coverage.');
        }

        if (config.async_plain && config.async_plainonly) {
            this.warn('You are using both config flags `async_plain` and `async_plainonly`. Disable one to optimise your source.');
        }

        if (!config.stats_coverage && config.stats_coverage_async) {
            this.warn('You are using `stats_coverage_async` without `stats_coverage`. Enable `stats_coverage` flag.');
        }

        if (!config.async && config.stats_coverage_async) {
            this.warn('You are using `stats_coverage_async` but not using `async`. Disable `stats_coverage_async` flag.');
        }

        sandbox = this.getSandboxedModules(modules, config);
        lmdFile = this.render(config, lmdModules, lmdMain, pack, sandbox, config.stats_coverage ? coverageOptions : void 0);

        if (this.outputFile) {
            fs.writeFileSync(this.outputFile, lmdFile,'utf8')
        } else {
            process.stdout.write(lmdFile);
        }
    }

    // callback must be called anyway
    if (typeof callback === 'function') {
        callback();
    }
}