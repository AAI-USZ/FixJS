function (global) {
    /// <summary>NodeJS detecting, handling, and module export.</summary>

    //$ = typeof $ !== 'undefined' && $ || require('jquery');

    if (typeof window === "undefined") {
        window = this;
    }

    $data = window["$data"] || (window["$data"] = {});

    if (typeof module !== "undefined" && module.exports) {
        try {
            sqLiteModule = require('sqlite3');
            if (sqLiteModule) window['openDatabase'] = true;
        }
        catch (e) { }
        module.exports = $data;
    }

}