f            
                /*
                 * keyframes:
                 *   : KEYFRAMES_SYM S* keyframe_name S* '{' S* keyframe_rule* '}' {
                 *   ;
                 */
                var tokenStream = this._tokenStream,
                    token,
                    tt,
                    name;            
                    
                tokenStream.mustMatch(Tokens.KEYFRAMES_SYM);
                this._readWhitespace();
                name = this._keyframe_name();
                
                this._readWhitespace();
                tokenStream.mustMatch(Tokens.LBRACE);
                    
                this.fire({
                    type:   "startkeyframes",
                    name:   name,
                    line:   name.line,
                    col:    name.col
                });                
                
                this._readWhitespace();
                tt = tokenStream.peek();
                
                //check for key
                while(tt == Tokens.IDENT || tt == Tokens.PERCENTAGE) {
                    this._keyframe_rule();
                    this._readWhitespace();
                    tt = tokenStream.peek();
                }           
                
                this.fire({
                    type:   "endkeyframes",
                    name:   name,
                    line:   name.line,
                    col:    name.col
                });                      
                    
                this._readWhitespace();
                tokenStream.mustMatch(Tokens.RBRACE);                    
                
            },
