function (wholeMatch,m1,m2,m3,m4,m5) {
             var c = '\0\0\0\0' + m4 + '\0\0\0\0'
             c = c.replace(/\0\0\0\0([ \t]*)/,"") // leading whitespace
             c = c.replace(/[ \t]*\0\0\0\0/,"") // trailing whitespace
             c = _EncodeCode(c, m2)
             return m1 + "<pre><code>" + c + "</code></pre>"
           }