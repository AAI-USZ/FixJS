function(key, value) {
    if (!options.hasOwnProperty(key))
        throw new Error("Unknown confik key: " + key);
        
    options[key] = value;
}