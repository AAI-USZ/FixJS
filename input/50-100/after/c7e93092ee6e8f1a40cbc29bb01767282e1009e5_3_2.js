function hasValidExtension(file) {
    return VALID_EXTENSIONS.some(function (element, index, array) {
        return path.extname(file) === element;
    });
}