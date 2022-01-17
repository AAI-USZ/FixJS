function nextToken() {
    while (this.c != this.EOF) {
        switch(this.c) {
            case ' ':
            case '\t':
            case '\n':
            case '\r':
                this.WS();
                continue;
            case ',' :
                this.consume();
                return new Token(this.COMMA, ",");
            case '[' :
                this.consume();
                return new Token(this.LBRACK, "[");
            case ']' :
                this.consume();
                return new Token(this.RBRACK, "]");
            default:
                if (this.isLETTER())
                    return this.NameToken();
                throw ("invalid character: " + c);
        }
    }
//    console.log('inspect >> Lexer << ');
//    console.log(util.inspect(Lexer, true, 2, true));
//    console.log("Lexer.EOF_TYPE : " + Lexer.EOF_TYPE);
    return new Token(this.EOF_TYPE, "<EOF>");
}