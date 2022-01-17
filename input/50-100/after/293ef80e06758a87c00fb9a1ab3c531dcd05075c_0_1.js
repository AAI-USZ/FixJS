function(o) {
    if ((typeof o === "number" || typeof o === "string" || typeof o === "boolean")
        && typeof this._hash[o] === "undefined") {
        this._hash[o] = true;
        this._count++;
        return true;
    }
    return false;
}