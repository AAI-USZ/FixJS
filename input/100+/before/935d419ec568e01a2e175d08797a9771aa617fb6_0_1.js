function processAuthorData(data, widgetConfig) {
    if (data.author) {
        var attribs = data.author["@"];

        if (!attribs && typeof data.author === "string") {
            //do not sanitize empty objects {} (must be string)
            widgetConfig.author = sanitize(data.author).trim();
        } else if (data.author["#"]) {
            widgetConfig.author = sanitize(data.author["#"]).trim();
        }

        if (attribs) {
            widgetConfig.authorURL = attribs.href;
            widgetConfig.copyright = attribs["rim:copyright"];
            widgetConfig.authorEmail = attribs.email;
        }
    }
}