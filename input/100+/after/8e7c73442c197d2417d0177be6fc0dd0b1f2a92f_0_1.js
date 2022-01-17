function resolvePackage(base, packagePath) {
    if (packagePath[0] === "." || packagePath[0] === "/") {
        var newPath = path.resolve(base, packagePath, "package.json");
        if (fs.existsSync(newPath)) return newPath;
    }
    else {
        while (base) {
            var newPath = path.resolve(base, "node_modules", packagePath, "package.json");
            if (fs.existsSync(newPath)) return newPath;
            base = base.substr(0, base.lastIndexOf("/"));
        }
    }
    throw new Error("Can't find '" + packagePath + "' relative to '" + base + '"');
}