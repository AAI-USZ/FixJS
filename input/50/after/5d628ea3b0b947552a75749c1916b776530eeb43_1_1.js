function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
            return 2; // error token
        } else {
            throw new Error(str);
        }
    }