function(key) {
    if (!options.hasOwnProperty(key))
        throw new Error("Unknown confik key: " + key);
        
    return options[key];
}