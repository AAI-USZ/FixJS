function guessExtension(headers) {
    if (headers['content-disposition']) {
        var match = headers['content-disposition'].match(/filename=['"](.*)['"]$/);
        if (!match) {
            // Taken from node-get, supports unquoted filenames
            match = headers['content-disposition'].match(/filename=['"]?([^'";]+)['"]?/);
        }
        if (match) {
            var ext = path.extname(match[1]);
            if (ext) {
                return ext;
            }
        }
    } else if (headers['content-type']) {
        var ext = mime.extension(headers['content-type'].split(';')[0]);
        if (ext) {
            return '.' + ext;
        }
    }
    return false;
}