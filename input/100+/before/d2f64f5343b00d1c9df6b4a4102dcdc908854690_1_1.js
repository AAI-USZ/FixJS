function(D, P){

        D.DEFAULT_ARGS = {
                buffer : [ "buffer" , null ],
                line   : [ "line"   , 0 ],
                col    : [ "col"    , 0 ]
        };

        P.nextCol = function() {
                ++this.col;
        };

        P.prevCol = function() {
                --this.col;
        };

        P.nextLine = function() {
                ++this.line;
                this.col = 0;
        };

        P.prevLine = function() {
                --this.line;
                this.col = 0;
        };

        P.peek = function(n) {
                if (n == null) n = 0;
                return this.buffer.code[this.line].charAt(this.col + n);
        };

        P.get = function() {
                var ch = this.peek();
                this.nextCol();
                return ch;
        };

        P.lineText = function(row) {
                if (row == null)
                        row = this.line;
                return this.buffer.code[row];
        };

        P.lineIndentation = function(row) {
                return /^\s*/.exec(this.lineText(row))[0].length;
        };

        P.lookingAt = function(what) {
                var line = this.buffer.code[this.line];
                if (what instanceof RegExp) {
                        return what.exec(line.substr(this.col));
                } else {
                        return line.substr(this.col, what.length) == what;
                }
        };

        P.textBefore = function(pos) {
                if (pos == null)
                        pos = this.buffer._rowColToPosition(this.line, this.col);
                return this.buffer.getCode().substr(0, pos);
        };

        P.textAfter = function(pos) {
                if (pos == null)
                        pos = this.buffer._rowColToPosition(this.line, this.col);
                return this.buffer.getCode().substr(pos);
        };

        P.substring = function(start, end) {
                return this.buffer.getCode().substring(start, end);
        };

        P.substr = function(start, end) {
                return this.buffer.getCode().substr(start, end);
        };

        P.eol = function() {
                return this.col == this.buffer.code[this.line].length;
        };

        P.eof = function() {
                var n = this.buffer.code.length, l = this.line;
                return l >= n || l == n - 1 && this.eol();
        };

        P.length = function() {
                return this.buffer.code.length;
        };

        P.lineLength = function(line) {
                if (line == null)
                        line = this.line;
                return this.buffer.code[line].length;
        };

        P.save = function() {
                return { buffer: this.buffer, line: this.line, col: this.col };
        };

        P.restore = function(state) {
                this.buffer = state.buffer;
                this.line = state.line;
                this.col = state.col;
        };

        P.checkStop = function() {
                if (this.eof()) throw this.EOF;
                if (this.eol()) throw this.EOL;
        };

        P.EOL = {};

        P.EOF = {};

}