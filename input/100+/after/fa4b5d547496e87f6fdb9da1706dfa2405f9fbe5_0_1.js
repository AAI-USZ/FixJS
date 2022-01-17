function(name, component) {
    if (options.$moduleUrls[name])
        return options.$moduleUrls[name];

    var parts = name.split("/");
    component = component || parts[1];
    var base = parts[2].replace(component, "").replace(/(^[\-_])|([\-_]$)/, "");

    if (!base)
        base = parts[1];
    return this.get(component + "Path") + "/" + component + "-" + base + this.get("suffix");
}