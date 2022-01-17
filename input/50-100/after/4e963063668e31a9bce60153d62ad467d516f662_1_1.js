function update_badge(data) {
    if (!get_config("tooltip"))
        return;

    var txt = "";
    if (data) {
        var jscount = data.js.length;
        var csscount = data.css.length;
        txt = ""+jscount+" "+csscount;
    }

    chrome.browserAction.setBadgeText({"text":txt});
}