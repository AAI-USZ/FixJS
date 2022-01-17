function requireIfExists(module) {
    if (railway.utils.existsSync(module)) {
        require(module);
        return true;
    } else {
        return false;
    }
}