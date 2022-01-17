function(curr){
		var  next = this.tokens[ this.tokens.length - 1 ]
			,ahead = this.tokens[ this.tokens.length - 2 ]
			,tagName = null
			,opener;
		
		switch(curr.type){
			
			case AT_STAR_OPEN:
				this.advanceUntilMatched(curr, AT_STAR_OPEN, AT_STAR_CLOSE, AT, AT);
				break;
			
			case AT:
				if(next) { switch(next.type){
					
					case PAREN_OPEN:
					case IDENTIFIER:
					case HTML_RAW:

						if(this.ast.length === 0) {
							this.ast = this.ast.parent;
							this.ast.pop(); // remove empty MKP block
						}

						this.ast = this.ast.beget( EXP );
						break;
					
					case KEYWORD:
					case FUNCTION:
					case BRACE_OPEN:

						if(this.ast.length === 0) {
							this.ast = this.ast.parent;
							this.ast.pop(); // remove empty MKP block
						}

						this.ast = this.ast.beget( BLK );
						break;
					
					default:
						this.ast.push( this.tokens.pop() );
						break;
				} }
				break;
			
			case BRACE_OPEN:
				this.ast = this.ast.beget( BLK );
				this.tokens.push(curr); // defer
				break;

			case BRACE_CLOSE:
				this.ast = this.ast.parent;
				this.tokens.push(curr); // defer
				break;
			
			case TEXT_TAG_OPEN:
			case HTML_TAG_OPEN:
				tagName = curr.val.match(/^<([^\/ >]+)/i);
				
				if(tagName === null && next && next.type === AT && ahead){
					tagName = ahead.val.match(/(.*)/); // HACK for <@exp>
				}

				if(this.ast.tagName){
					// current markup is already waiting for a close tag, make new child
					this.ast = this.ast.beget(MKP, tagName[1]);
				} else {
					this.ast.tagName = tagName[1];
				}

				if(HTML_TAG_OPEN === curr.type) {
					this.ast.push(curr);
				}

				break;
			
			case TEXT_TAG_CLOSE:
			case HTML_TAG_CLOSE:
				tagName = curr.val.match(/^<\/([^>]+)/i);
				
				if(tagName === null && next && next.type === AT && ahead){
					tagName = ahead.val.match(/(.*)/); // HACK for </@exp>
				}
				
				opener = this.ast.closest( MKP, tagName[1] );
				
				if(opener === null || opener.tagName !== tagName[1]){
					// couldn't find opening tag
					// could mean this closer is within a child parser
					//throw this.exceptionFactory(new Error, 'UNMATCHED', curr);
				} else {
					this.ast = opener;
				}
				
				if(HTML_TAG_CLOSE === curr.type) {
					this.ast.push( curr );
				}

				if(
					this.ast.parent && this.ast.parent.mode === BLK
					&& (next.type === WHITESPACE || next.type === NEWLINE)
				){
					this.ast = this.ast.parent;
				}
				break;

			case HTML_TAG_SELFCLOSE:

				this.ast.push(curr);

				if(
					this.ast.parent && this.ast.parent.mode === BLK
					&& (next.type === WHITESPACE || next.type === NEWLINE)
				){
					this.ast = this.ast.parent;
				}
				break;

			default:
				this.ast.push(curr);
				break;
		}
		
	}