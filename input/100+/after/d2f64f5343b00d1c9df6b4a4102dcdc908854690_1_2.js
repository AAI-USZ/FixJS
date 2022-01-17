function(what) {
                var line = this.buffer.code[this.line];
                if (what instanceof RegExp) {
                        return what.exec(line.substr(this.col));
                } else {
                        return line.substr(this.col, what.length) == what;
                }
        }