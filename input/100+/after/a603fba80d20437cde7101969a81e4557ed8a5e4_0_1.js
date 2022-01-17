function (configA, configB, flagsNames, isMasterConfig, context) {
    if (isMasterConfig) {
        // Apply master fields
        MASTER_FIELDS.forEach(function (fieldName) {
            if (typeof configB[fieldName] !== "undefined") {
                configA[fieldName] = configB[fieldName];
            }
        });
    }

    // Save errors
    configA.errors = configA.errors || [];
    configB.errors = configB.errors || [];
    configA.errors = configA.errors.concat(configB.errors);

    // Apply Flags
    flagsNames.forEach(function (optionsName) {
        // if master -> B
        if (typeof configB[optionsName] === "undefined") {
            return;
        }

        if (isMasterConfig) {
            configA[optionsName] = configB[optionsName];
        } else {
            // if A literal B array -> B
            if (configB[optionsName] instanceof Array && !(configA[optionsName] instanceof Array) ) {
                configA[optionsName] = configB[optionsName];
            } else if (configB[optionsName] instanceof Array && configA[optionsName] instanceof Array) {
                // if A array B array -> A concat B
                configA[optionsName] = configA[optionsName].concat(configB[optionsName]);
            } else {
                // if A literal B literal -> union
                // if A array B literal -> A
                configA[optionsName] = configA[optionsName] || configB[optionsName];
            }
            // else {}
        }
    });

    // Apply Modules
    configA.modules = configA.modules || {};
    configB.modules = configB.modules || {};
    for (var moduleName in configB.modules) {
        // Warn if module exists an its not a master
        if (!isMasterConfig && configA.modules[moduleName]) {
            configA.errors.push('Name conflict! Module **"' + moduleName + '"** will be overwritten by ' + context);
        }
        configA.modules[moduleName] = configB.modules[moduleName];
    }

    return configA; // not rly need...
}