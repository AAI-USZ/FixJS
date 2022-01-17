function(name) {
    var parts = name.split("/");
    if (parts[0] !== "ace") return;

    var component = parts[1];
    var base = parts[2];

    if (component == "mode") {
        return this.get("modePath") + "/mode-" + base + this.get("suffix");
    } else if (component === "theme") {
        return this.get("themePath") + "/theme-" + base + this.get("suffix");
    } else if (component == "worker") {
        return this.get("workerPath") + "/worker-" + base + this.get("suffix");
    }
}