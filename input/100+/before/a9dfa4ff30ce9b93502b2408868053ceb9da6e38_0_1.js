function (registryPath) {
        var args = gpii.lifecycleManager.registryResolver.parseArguments(registryPath);
        return gpii.windows.readRegistryKey.apply(null, args).value;
    }