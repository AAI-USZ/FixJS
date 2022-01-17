function _lintCPP(prev, baton) {
    //Only cpplint on unix. Windows currently has an issue with cpplinting
    if (os.type().toLowerCase().indexOf("windows") === -1) {
        var options = ["--R", "--filter=-whitespace/line_length,-whitespace/comments,-whitespace/labels,-readability/streams"],
            files = ["ext"];
        _exec('python ' + __dirname + "/../dependencies/cpplint/cpplint.py " + options.concat(files).join(' '), prev, baton);
    }
}