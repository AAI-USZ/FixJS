function requireIfExists(module) {
    if (path.existsSync(module)) {
        require(module);
        return true;
    } else {
        return false;
    }
}