function (ch) {
        var len = ch.length;
        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length-1);
        this.yyleng -= len;
        this.offset -= len;
        this.match = this.match.substr(0, this.match.length-1);
        this.matched = this.matched.substr(0, this.matched.length-1);
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) this.yylineno -= lines.length;
        return this;
    }