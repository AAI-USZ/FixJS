function (global) {
    /// <summary>NodeJS detecting, handling, and module export.</summary>

    //$ = typeof $ !== 'undefined' && $ || require('jquery');

    if (typeof window === "undefined") {
        window = this;
    }

    $data = window["$data"] || (window["$data"] = {});

    if (typeof module !== "undefined" && module.exports) {
        sqLiteModule = require('sqlite3');
		if (sqLiteModule) window['openDatabase'] = true;
        module.exports = $data;
    }

}