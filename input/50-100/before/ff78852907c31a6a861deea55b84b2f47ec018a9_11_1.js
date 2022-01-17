function parseBorrows(doclet, tag) {
    var m = /^(\S+)(?:\s+as\s+(\S+))?$/.exec(tag.text);
    if (m) {
        if (m[1] && m[2]) {
            return [ m[1], m[2] ];
        }
        else if (m[1]) {
            return [ m[1] ];
        }
    }
}