function(key, value) {
    if (!options.hasOwnProperty(key))
        throw new Error("Unknown config key: " + key);
        
    options[key] = value;
}