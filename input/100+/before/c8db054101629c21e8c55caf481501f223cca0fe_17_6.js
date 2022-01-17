function (config, callback) {
    var webinosDemo = common.webinosConfigPath();
    if (typeof config!== "undefined") {
        fs.writeFile((webinosDemo+ "/config/"+config.name+".json"), JSON.stringify(config, null, " "), function(err) {
            if(err) {
                callback(false);
                log("ERROR", "[CONFIG] Error saving configuration file - "+config.name);
            } else {
                callback(true);
                log("INFO", "[CONFIG] Saved configuration file - " + config.name);
            }
        });
    }
}