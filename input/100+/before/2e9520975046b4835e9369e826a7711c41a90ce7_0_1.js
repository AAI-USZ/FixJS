function() {
        var e,
            i,
            env,
            envs = ['client', 'server'],
            mojitType,
            ctxKey,
            module,
            parts,
            required,
            resid,
            res,
            sorted,
            ctxs;

        for (e = 0; e < envs.length; e += 1) {
            env = envs[e];

            // mojit-specific
            // --------------
            if (!this._mojitYuiSorted[env]) {
                this._mojitYuiRequired[env] = {};
                this._mojitYuiSorted[env] = {};
                this._mojitYuiSortedPaths[env] = {};
            }
            for (mojitType in this._mojitMeta[env]) {
                if (this._mojitMeta[env].hasOwnProperty(mojitType)) {

                    if (!this._mojitYuiSorted[env][mojitType]) {
                        this._mojitYuiRequired[env][mojitType] = {};
                        this._mojitYuiSorted[env][mojitType] = {};
                        this._mojitYuiSortedPaths[env][mojitType] = {};
                    }
                    for (ctxKey in this._mojitMeta[env][mojitType].contexts) {
                        if (this._mojitMeta[env
                                ][mojitType].contexts.hasOwnProperty(ctxKey)) {

                            // we handle non-context version below
                            if ('*' === ctxKey) {
                                continue;
                            }
                            if (!this._mojitYuiSorted[env
                                    ][mojitType].contexts) {
                                this._mojitYuiRequired[env
                                    ][mojitType].contexts = {};
                                this._mojitYuiSorted[env
                                    ][mojitType].contexts = {};
                                this._mojitYuiSortedPaths[env
                                    ][mojitType].contexts = {};
                            }

                            parts = {};
                            this._precalcYuiDependencies_getDepParts(env,
                                this._mojitMeta[env][mojitType]['*'], parts);
                            this._precalcYuiDependencies_getDepParts(env,
                                this._mojitMeta[env][mojitType][ctxKey], parts);
                            if (parts.controller &&
                                    parts.modules['inlinecss/' + mojitType]) {
                                parts.modules[parts.controller.yuiModuleName].
                                    requires.push('inlinecss/' + mojitType);
                            }
                            this._mojitYuiSorted[env
                                ][mojitType].contexts[ctxKey] =
                                this._mojitMeta[env
                                    ][mojitType].contexts[ctxKey];
                            this._mojitYuiRequired[env
                                ][mojitType].contexts[ctxKey] =
                                this._mojitMeta[env
                                    ][mojitType].contexts[ctxKey];
                            if (parts.controller) {
                                parts.required[parts.controller.yuiModuleName] =
                                    true;
                                // dependencies necessary to dispatch the mojit
                                parts.required['mojito-dispatcher'] = true;
                                sorted = this._sortYUIModules(
                                    this._mojitMeta[env][mojitType
                                        ].contexts[ctxKey],
                                    env,
                                    this._appConfigStatic.yui,
                                    mojitType,
                                    parts.modules,
                                    parts.required
                                );
                                this._mojitYuiRequired[env
                                    ][mojitType][ctxKey] =
                                    Object.keys(parts.required);
                                this._mojitYuiSorted[env
                                    ][mojitType][ctxKey] = sorted.sorted;
                                this._mojitYuiSortedPaths[env
                                    ][mojitType][ctxKey] = sorted.paths;
                            }

                            // also calculate sortedPaths for each individual binder
                            if ('client' === env) {
                                for (resid in this._mojitMeta[env
                                        ][mojitType][ctxKey]) {
                                    if (this._mojitMeta[env
                                            ][mojitType][ctxKey
                                            ].hasOwnProperty(resid)) {
                                        res = this._mojitMeta[env
                                            ][mojitType][ctxKey][resid];
                                        if (res.type !== 'binder') {
                                            continue;
                                        }
                                        required = {};
                                        required[res.yuiModuleName] = true;
                                        // all binders have this dependency,
                                        // even if not explicitly given
                                        required['mojito-client'] = true;
                                        // view engines are needed to support
                                        // mojitProxy.render()
                                        for (i in parts.viewEngines) {
                                            if (parts.viewEngines.
                                                    hasOwnProperty(i)) {
                                                required[parts.viewEngines[i]] =
                                                    true;
                                            }
                                        }
                                        sorted = this._sortYUIModules(
                                            this._mojitMeta[env][mojitType
                                                ].contexts[ctxKey],
                                            env,
                                            this._appConfigStatic.yui,
                                            mojitType,
                                            parts.modules,
                                            required
                                        );
                                        res.yuiSortedPaths = sorted.paths;
                                    }
                                }
                            } // env==client
                        }
                    } // foreach context (except '*')

                    // here's where we handle the non-context version
                    if (this._mojitMeta[env][mojitType]['*']) {
                        if (!this._mojitYuiSorted[env][mojitType].contexts) {
                            this._mojitYuiRequired[env
                                ][mojitType].contexts = {};
                            this._mojitYuiSorted[env][mojitType].contexts = {};
                            this._mojitYuiSortedPaths[env
                                ][mojitType].contexts = {};
                        }
                        parts = {};
                        this._precalcYuiDependencies_getDepParts(env,
                            this._mojitMeta[env][mojitType]['*'],
                            parts);
                        if (parts.controller && parts.modules['inlinecss/' +
                                mojitType]) {
                            parts.modules[parts.controller.yuiModuleName].
                                requires.push('inlinecss/' + mojitType);
                        }
                        this._mojitYuiSorted[env][mojitType].contexts['*'] =
                            this._mojitMeta[env][mojitType].contexts['*'];
                        this._mojitYuiRequired[env][mojitType].contexts['*'] =
                            this._mojitMeta[env][mojitType].contexts['*'];
                        if (parts.controller) {
                            parts.required[parts.controller.yuiModuleName] =
                                true;
                            // dependencies necessary to dispatch the mojit
                            parts.required['mojito-dispatcher'] = true;
                            sorted = this._sortYUIModules(
                                this._mojitMeta[env][mojitType].contexts['*'],
                                env,
                                this._appConfigStatic.yui,
                                mojitType,
                                parts.modules,
                                parts.required
                            );
                            this._mojitYuiRequired[env][mojitType]['*'] =
                                Object.keys(parts.required);
                            this._mojitYuiSorted[env][mojitType]['*'] =
                                sorted.sorted;
                            this._mojitYuiSortedPaths[env][mojitType]['*'] =
                                sorted.paths;
                        }

                        // also calculate sortedPaths for each individual binder
                        if ('client' === env) {
                            for (resid in this._mojitMeta[env
                                    ][mojitType]['*']) {
                                if (this._mojitMeta[env][mojitType
                                        ]['*'].hasOwnProperty(resid)) {
                                    res = this._mojitMeta[env][mojitType
                                        ]['*'][resid];
                                    if (res.type !== 'binder') {
                                        continue;
                                    }
                                    required = {};
                                    required[res.yuiModuleName] = true;
                                    // all binders have this dependency, even if
                                    // not explicitly given
                                    required['mojito-client'] = true;
                                    // view engines are needed to support
                                    // mojitProxy.render()
                                    for (i in parts.viewEngines) {
                                        if (parts.viewEngines.
                                                hasOwnProperty(i)
                                                ) {
                                            required[parts.viewEngines[i]] =
                                                true;
                                        }
                                    }
                                    sorted = this._sortYUIModules(
                                        this._mojitMeta[env][mojitType
                                            ].contexts['*'],
                                        env,
                                        this._appConfigStatic.yui,
                                        mojitType,
                                        parts.modules,
                                        required
                                    );
                                    res.yuiSortedPaths = sorted.paths;
                                }
                            }
                        } // env==client
                    } // context=='*'
                }
            } // foreach mojitType
        } // foreach env
    }