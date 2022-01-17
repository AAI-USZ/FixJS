function (wholeMatch,m1,m2) {
             var c = '\0\0\0\0' + m2 + '\0\0\0\0'
             c = c.replace(/\0\0\0\0([ \t]*)/,"") // leading whitespace
             c = c.replace(/[ \t]*\0\0\0\0/,"") // trailing whitespace
             c = _EncodeCode(c, m1)
             return "<pre><code>" + c + "</code></pre>"
           }