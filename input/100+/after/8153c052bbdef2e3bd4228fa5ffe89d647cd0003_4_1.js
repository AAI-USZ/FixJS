function filterNonObjects(suspect, method) {
    if (suspect.constructor == Object) {
        return suspect;
    }
    else {
        throw new Error(method + " called on a non-object");
    }
}