function(bracket, position, typeRe) {
        var closingBracket = this.$brackets[bracket];
        var depth = 1;

        var iterator = new TokenIterator(this, position.row, position.column);
        var token = iterator.getCurrentToken();
        if (!token)
            token = iterator.stepForward();
        if (!token)
            return

        if (!typeRe){
            typeRe = new RegExp(
                "(\\.?" +
                token.type.replace(".", "\\.").replace("lparen", ".paren")
                + ")+"
            );
        }

        // Start searching in token, after the character at position.column
        var valueIndex = position.column - iterator.getCurrentTokenColumn();

        while (true) {

            var value = token.value;
            var valueLength = value.length;
            while (valueIndex < valueLength) {
                var chr = value.charAt(valueIndex);
                if (chr == closingBracket) {
                    depth -= 1;
                    if (depth == 0) {
                        return {row: iterator.getCurrentTokenRow(),
                            column: valueIndex + iterator.getCurrentTokenColumn()};
                    }
                }
                else if (chr == bracket) {
                    depth += 1;
                }
                valueIndex += 1;
            }

            // Scan forward through the document, looking for the next token
            // whose type matches typeRe
            do {
                token = iterator.stepForward();
            } while (token && !typeRe.test(token.type));

            if (token == null)
                break;

            valueIndex = 0;
        }
        
        return null;
    }