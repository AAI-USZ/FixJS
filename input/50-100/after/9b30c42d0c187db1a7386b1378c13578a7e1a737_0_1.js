function findPashua() {
        var locations = [ process.execPath.replace(/[^\/]*$/, "Pashua"),
                          '/Applications/Pashua.app/Contents/MacOS/Pashua'
                        ];
        for (var i in locations) {
            var candidate = locations[i];
            if (fs.existsSync(candidate)) {
                return candidate;
            }
        }
        throw "Pashua not found in any of these locations: " + locations;
    }