function(def){
    console.log(def);
    var contentPrefService = require("preferences-service");
    if (def == true){
        contentPrefService.set("keyword.URL", "https://duckduckgo.com/?q=");
    } else {
        contentPrefService.set("keyword.URL", "");
    }
}