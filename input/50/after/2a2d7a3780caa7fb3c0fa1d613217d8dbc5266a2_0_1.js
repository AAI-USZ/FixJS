function (out, cb) {
            // optionally uglify (do not mangle)
            var ast;
            if (optMini) {
                out = jsmin.jsmin(out);
            }
            // write the result
            safeWrite(jsstream, out, false);
            cb(null);
        }