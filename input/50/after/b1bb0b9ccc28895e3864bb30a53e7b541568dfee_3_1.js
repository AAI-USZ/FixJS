function(key) {
    if (!options.hasOwnProperty(key))
        throw new Error("Unknown config key: " + key);
        
    return options[key];
}