function(exists) {
            if (exists) {
                fs.readFile(_self.settingsPath, "utf8", callback);
            }
            else {
                callback("settings file does not exist", "");
            }
        }