f        var indent = this.$getIndent(line);

        var tokenizedLine = this.$tokenizer.getLineTokens(line, state);
        var tokens = tokenizedLine.tokens;
    
        var chunks = ["function", "then", "do", "repeat"];
        
        if (state == "start") {
            var match = line.match(/^.*[\{\(\[]\s*$/);
            if (match) {
                indent += tab;
            } else {
                for (var i in tokens){
                    var token = tokens[i];
                    if (token.type != "keyword") continue;
                    var chunk_i = chunks.indexOf(token.value);
                    if (chunk_i != -1){
                        indent += tab;
                        break;
                    }
                }
            }
        } 

        return indent;
    };
