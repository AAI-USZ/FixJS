function update_badge(data) {
    if (!get_config("tooltip"))
        return;

    var jscount = data.js.length;
    var csscount = data.css.length;
    chrome.browserAction.setBadgeText({"text":""+jscount+" "+csscount});
}