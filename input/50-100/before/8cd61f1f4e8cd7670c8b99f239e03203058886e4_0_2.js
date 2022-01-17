function (key) {
        if (!key) {
            //getting current language
            return currentLanguage;
        }

        //fall back to default, which is en
        currentLanguage = "en";

        key = key.toLowerCase();
        if (typeof languages[key] !== "undefined") {
            currentLanguage = key;
        }
        else if (key.indexOf("-") > 0) {
            var main = key.substr(0, key.indexOf("-"));
            if (typeof languages[main] !== "undefined") {
                currentLanguage = key;
            }
        }

        return currentLanguage;
    }