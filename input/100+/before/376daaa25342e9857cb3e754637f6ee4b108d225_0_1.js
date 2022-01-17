function(filename) {
    var path = require('path'),
        exts = ["", ".roy", ".lroy"],
        filenames = _.map(exts, function(ext){
            return filename + ext;
        }),
        source,
        err,
        i;

    // Check to see if an extension is specified, if so, don't bother
    // checking others
    if (/\..+$/.test(filename)) {
        source = fs.readFileSync(filename, 'utf8');
        filenames = [filename];
    } else {
        source = _.find(filenames, function(filename) {
            return path.existsSync(filename);
        });
    }

    if(source == null) {
        throw new Error("File(s) not found: " + filenames.join(", "));
    }

    return source;
}