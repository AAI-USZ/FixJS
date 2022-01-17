function(name) {
    var parts = name.split("/");
    var component = parts[1];
    var base = parts[2];

    return this.get(component + "Path") + "/" + component + "-" + base + this.get("suffix");
}