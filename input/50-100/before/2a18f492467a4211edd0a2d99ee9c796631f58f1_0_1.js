function _lintCPP(prev, baton) {
    var options = ["--R", "--filter=-whitespace/line_length,-whitespace/comments,-whitespace/labels,-readability/streams"],
        files = ["ext"];
    _exec('python ' + __dirname + "/../dependencies/cpplint/cpplint.py " + options.concat(files).join(' '), prev, baton);
}