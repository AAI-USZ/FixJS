function parseBorrows(doclet, tag) {
    var m = /^(\S+)(?:\s+as\s+(\S+))?$/.exec(tag.text);
    if (m) {
        if (m[1] && m[2]) {
            return { target: m[1], source: m[2] };
        }
        else if (m[1]) {
            return { target: m[1] };
        }
    } else {
        return {};
    }
}