function(D, P){
        D.DEFAULT_ARGS = {
                buffer : [ "buffer" , null ],
                line   : [ "line"   , 0 ],
                col    : [ "col"    , 0 ],
                pos    : [ "pos"    , null ]
        };
        D.CONSTRUCT = function() {
                if (this.pos == null)
                        this.pos = this.buffer._rowColToPosition(this.line, this.col);
                else {
                        var rc = this.buffer._positionToRowCol(this.pos);
                        this.line = rc.row;
                        this.col = rc.col;
                }
        };
        P.peek = function() {
                var a = this.buffer.code;
                var line = a[this.line];
                if (line == null) return null;
                if (this.col == line.length)
                        return this.line == a.length - 1 ? null : "\n";
                return line.charAt(this.col);
        };
        P.next = function() {
                var ch = this.peek();
                ++this.pos;
                ++this.col;
                if (this.col > this.buffer.code[this.line].length) {
                        this.col = 0;
                        ++this.line;
                }
                return ch;
        };
        P.read_while = function(pred) {
                var ret = "";
                while (pred(this.peek()))
                        ret += this.next();
                return ret;
        };
        P.is_whitespace = function(ch) {
                switch (ch) {
                    case " ":
                    case "\n":
                    case "\t":
                    case "\x0C":
                    case "\u2028":
                    case "\u2029":
                    case "\xA0":
                        return true;
                }
        };
        P.skip_ws = function() {
                return this.read_while(this.is_whitespace);
        };
}