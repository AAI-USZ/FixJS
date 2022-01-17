function(stream, state) {
            var style = tokenLexer(stream, state);
            
            state.lastToken = style;
            
            if (stream.eol() && stream.lambda) {
                state.lambda = false;
            }
            
            return style;
        }