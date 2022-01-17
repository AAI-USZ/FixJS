f		var regex = !noRegex; // TOFIX :)
		var pos = this.pos;
		var inp = this.inp;
		var shadowInp = this.shadowInp;
		var matchedNewline = false;
		do {
			if (!_dontStore) {
				++this.tokenCount;
				stack.push(returnValue);
				// did the parent Parser throw up?
				if (this.errorEscape) {
					returnValue = this.errorEscape;
					this.errorEscape = null;
					return returnValue;
				}
			}
			_dontStore = false;

			if (pos >= inp.length) {
				returnValue = {start:inp.length,stop:inp.length,name:12/*EOF*/};
				break;
			}
			var returnValue = null;

			var start = pos;
			var chr = inp[pos];

			//							1 ws							2 lt				   3 scmt 4 mcmt 5/6 str 7 nr     8 rx  9 punc
			//if (true) {
				// substring method (I think this is faster..)
				var part2 = inp.substring(pos,pos+4);
				var part = this.regexBig.exec(part2);
			//} else {
			//	// non-substring method (lastIndex)
			//	// this method does not need a substring to apply it
			//	this.regexBigAlt.lastIndex = pos;
			//	var part = this.regexBigAlt.exec(inp);
			//}

			if (part[1]) { //this.regexWhiteSpace.test(chr)) { // SP, TAB, VT, FF, NBSP, BOM (, TOFIX: USP)
				++pos;
				returnValue = {start:start,stop:pos,name:9/*WHITE_SPACE*/,line:this.line,col:this.column,isWhite:true};
				++this.column;
			} else if (part[2]) { //this.regexLineTerminator.test(chr)) { // LF, CR, LS, PS
				var end = pos+1;
				if (chr=='\r' && inp[pos+1] == '\n') ++end; // support crlf=>lf
				returnValue = {start:pos,stop:end,name:10/*LINETERMINATOR*/,line:this.line,col:this.column,isWhite:true};
				pos = end;
				// mark newlines for ASI
				matchedNewline = true;
				++this.line;
				this.column = 0;
				returnValue.hasNewline = 1;
			} else if (part[3]) { //chr == '/' && inp[pos+1] == '/') {
				pos = shadowInp.indexOf('\n',pos);
				if (pos == -1) pos = inp.length;
				returnValue = {start:start,stop:pos,name:7/*COMMENT_SINGLE*/,line:this.line,col:this.column,isComment:true,isWhite:true};
				this.column = returnValue.stop;
			} else if (part[4]) { //chr == '/' && inp[pos+1] == '*') {
				var newpos = inp.indexOf('*/',pos);
				if (newpos == -1) {
					newpos = shadowInp.indexOf('\n', pos);
					if (newpos < 0) pos += 2;
					else pos = newpos;
					returnValue = {start:start,stop:pos,name:14/*error*/,value:inp.substring(start, pos),line:this.line,col:this.column,isComment:true,isWhite:true,tokenError:true,error:Tokenizer.Error.UnterminatedMultiLineComment};
					this.errorStack.push(returnValue);
				} else {
					pos = newpos+2;
					returnValue = {start:start,stop:pos,name:8/*COMMENT_MULTI*/,value:inp.substring(start, pos),line:this.line,col:this.column,isComment:true,isWhite:true};

					// multi line comments are also reason for asi, but only if they contain at least one newline (use shadow input, because all line terminators would be valid...)
					var shadowValue = shadowInp.substring(start, pos);
					var i = 0, hasNewline = 0;
					while (i < (i = shadowValue.indexOf('\n', i+1))) {
						++hasNewline;
					}
					if (hasNewline) {
						matchedNewline = true;
						returnValue.hasNewline = hasNewline;
						this.line += hasNewline;
						this.column = 0;
					} else {
						this.column = returnValue.stop;
					}
				}
			} else if (part[5]) { //chr == "'") {
				// old method
				//console.log("old method");

				var hasNewline = 0;
				do {
					// process escaped characters
					while (pos < inp.length && inp[++pos] == '\\') {
						if (shadowInp[pos+1] == '\n') ++hasNewline;
						++pos;
					}
					if (this.regexLineTerminator.test(inp[pos])) {
						returnValue = {start:start,stop:pos,name:14/*error*/,value:inp.substring(start, pos),isString:true,tokenError:true,error:Tokenizer.Error.UnterminatedDoubleStringNewline};
						this.errorStack.push(returnValue);
						break;
					}
				} while (pos < inp.length && inp[pos] != "'");
				if (returnValue) {} // error
				else if (inp[pos] != "'") {
					returnValue = {start:start,stop:pos,name:14/*error*/,value:inp.substring(start, pos),isString:true,tokenError:true,error:Tokenizer.Error.UnterminatedDoubleStringOther};
					this.errorStack.push(returnValue);
				} else {
					++pos;
					returnValue = {start:start,stop:pos,name:5/*STRING_SINGLE*/,isPrimitive:true,isString:true};
					if (hasNewline) {
						returnValue.hasNewline = hasNewline;
						this.line += hasNewline;
						this.column = 0;
					} else {
						this.column += (pos-start);
					}
				}
			} else if (part[6]) { //chr == '"') {
				var hasNewline = 0;
				// TODO: something like this: var regexmatch = /([^\']|$)+/.match();
				do {
					// process escaped chars
					while (pos < inp.length && inp[++pos] == '\\') {
						if (shadowInp[pos+1] == '\n') ++hasNewline;
						++pos;
					}
					if (this.regexLineTerminator.test(inp[pos])) {
						returnValue = {start:start,stop:pos,name:14/*error*/,value:inp.substring(start, pos),isString:true,tokenError:true,error:Tokenizer.Error.UnterminatedSingleStringNewline};
						this.errorStack.push(returnValue);
						break;
					}
				} while (pos < inp.length && inp[pos] != '"');
				if (returnValue) {}
				else if (inp[pos] != '"') {
					returnValue = {start:start,stop:pos,name:14/*error*/,value:inp.substring(start, pos),isString:true,tokenError:true,error:Tokenizer.Error.UnterminatedSingleStringOther};
					this.errorStack.push(returnValue);
				} else {
					++pos;
					returnValue = {start:start,stop:pos,name:6/*STRING_DOUBLE*/,isPrimitive:true,isString:true};
					if (hasNewline) {
						returnValue.hasNewline = hasNewline;
						this.line += hasNewline;
						this.column = 0;
					} else {
						this.column += (pos-start);
					}
				}
			} else if (part[7]) { //(chr >= '0' && chr <= '9') || (chr == '.' && inp[pos+1] >= '0' && inp[pos+1] <= '9')) {
				var nextPart = inp.substring(pos, pos+30);
				var match = nextPart.match(this.regexNumber);
				if (match[2]) { // decimal
					var value = match[2];
					var parsingOctal = value[0] == '0' && value[1] && value[1] != 'e' && value[1] != 'E' && value[1] != '.';
					if (parsingOctal) {
						returnValue = {start:start,stop:pos,name:14/*error*/,isNumber:true,isOctal:true,tokenError:true,error:Tokenizer.Error.IllegalOctalEscape,value:value};
						this.errorStack.push(returnValue);
					} else {
						returnValue = {start:start,stop:start+value.length,name:4/*NUMERIC_DEC*/,isPrimitive:true,isNumber:true,value:value};
					}
				} else if (match[1]) { // hex
					var value = match[1];
					returnValue = {start:start,stop:start+value.length,name:3/*NUMERIC_HEX*/,isPrimitive:true,isNumber:true,value:value};
				} else {
					throw 'unexpected parser errror... regex fail :(';
				}

				if (value.length < 300) {
					pos += value.length;
				} else {
					// old method of parsing numbers. only used for extremely long number literals (300+ chars).
					// this method does not require substringing... just memory :)
					var tmpReturnValue = this.oldNumberParser(pos, chr, inp, returnValue, start, Tokenizer);
					pos = tmpReturnValue[0];
					returnValue = tmpReturnValue[1];
				}
			} else if (regex && part[8]) { //chr == '/') { // regex cannot start with /* (would be multiline comment, and not make sense anyways). but if it was /* then an earlier if would have eated it. so we only check for /
				var twinfo = []; // matching {[( info
				var found = false;
				var parens = [];
				var nonLethalError = null;
				while (++pos < inp.length) {
					chr = shadowInp[pos];
					// parse RegularExpressionChar
					if (chr == '\n') {
						returnValue = {start:start,stop:pos,name:14/*error*/,tokenError:true,errorHasContent:true,error:Tokenizer.Error.UnterminatedRegularExpressionNewline};
						this.errorStack.push(returnValue);
						break; // fail
					} else if (chr == '/') {
						found = true;
						break;
					} else if (chr == '?' || chr == '*' || chr == '+') {
						nonLethalError = Tokenizer.Error.NothingToRepeat;
					} else if (chr == '^') {
						if (
							inp[pos-1] != '/' &&
							inp[pos-1] != '|' &&
							inp[pos-1] != '(' &&
							!(inp[pos-3] == '(' && inp[pos-2] == '?' && (inp[pos-1] == ':' || inp[pos-1] == '!' || inp[pos-1] == '='))
						) {
							nonLethalError = Tokenizer.Error.StartOfMatchShouldBeAtStart;
						}
					} else if (chr == '$') {
						if (inp[pos+1] != '/' && inp[pos+1] != '|' && inp[pos+1] != ')') nonLethalError = Tokenizer.Error.DollarShouldBeEnd;
					} else if (chr == '}') {
						nonLethalError = Tokenizer.Error.MissingOpeningCurly;
					} else { // it's a "character" (can be group or class), something to match
						// match parenthesis
						if (chr == '(') {
							parens.push(pos-start);
						} else if (chr == ')') {
							if (parens.length == 0) {
								nonLethalError = {start:start,stop:pos,name:14/*error*/,tokenError:true,error:Tokenizer.Error.RegexNoOpenGroups};
							} else {
								var twin = parens.pop();
								var now = pos-start;
								twinfo[twin] = now;
								twinfo[now] = twin;
							}
						}
						// first process character class
						if (chr == '[') {
							var before = pos-start;
							while (++pos < inp.length && shadowInp[pos] != '\n' && inp[pos] != ']') {
								// only newline is not allowed in class range
								// anything else can be escaped, most of it does not have to be escaped...
								if (inp[pos] == '\\') {
									if (shadowInp[pos+1] == '\n') break;
									else ++pos; // skip next char. (mainly prohibits ] to be picked up as closing the group...)
								}
							}
							if (inp[pos] != ']') {
								returnValue = {start:start,stop:pos,name:14/*error*/,tokenError:true,error:Tokenizer.Error.ClosingClassRangeNotFound};
								this.errorStack.push(returnValue);
								break;
							} else {
								var after = pos-start;
								twinfo[before] = after;
								twinfo[after] = before;
							}
						} else if (chr == '\\' && shadowInp[pos+1] != '\n') {
							// is ok anywhere in the regex (match next char literally, regardless of its otherwise special meaning)
							++pos;
						}

						// now process repeaters (+, ? and *)

						// non-collecting group (?:...) and positive (?=...) or negative (?!...) lookahead
						if (chr == '(') {
							if (inp[pos+1] == '?' && (inp[pos+2] == ':' || inp[pos+2] == '=' || inp[pos+2] == '!')) {
								pos += 2;
							}
						}
						// matching "char"
						else if (inp[pos+1] == '?') ++pos;
						else if (inp[pos+1] == '*' || inp[pos+1] == '+') {
							++pos;
							if (inp[pos+1] == '?') ++pos; // non-greedy match
						} else if (inp[pos+1] == '{') {
							pos += 1;
							var before = pos-start;
							// quantifier:
							// - {n}
							// - {n,}
							// - {n,m}
							if (!/[0-9]/.test(inp[pos+1])) {
								nonLethalError = Tokenizer.Error.QuantifierRequiresNumber;
							}
							while (++pos < inp.length && /[0-9]/.test(inp[pos+1]));
							if (inp[pos+1] == ',') {
								++pos;
								while (pos < inp.length && /[0-9]/.test(inp[pos+1])) ++pos;
							}
							if (inp[pos+1] != '}') {
								nonLethalError = Tokenizer.Error.QuantifierRequiresClosingCurly;
							} else {
								++pos;
								var after = pos-start;
								twinfo[before] = after;
								twinfo[after] = before;
								if (inp[pos+1] == '?') ++pos; // non-greedy match
							}
						}
					}
				}
				// if found=false, fail right now. otherwise try to parse an identifiername (that's all RegularExpressionFlags is..., but it's constructed in a stupid fashion)
				if (!found || returnValue) {
					if (!returnValue) {
						returnValue = {start:start,stop:pos,name:14/*error*/,tokenError:true,error:Tokenizer.Error.UnterminatedRegularExpressionOther};
						this.errorStack.push(returnValue);
					}
				} else {
					// this is the identifier scanner, for now
					do ++pos;
					while (pos < inp.length && this.hashAsciiIdentifier[inp[pos]]); /*this.regexAsciiIdentifier.test(inp[pos])*/

					if (parens.length) {
						// nope, this is still an error, there was at least one paren that did not have a matching twin
						if (parens.length > 0) returnValue = {start:start,stop:pos,name:14/*error*/,tokenError:true,error:Tokenizer.Error.RegexOpenGroup};
						this.errorStack.push(returnValue);
					} else if (nonLethalError) {
						returnValue = {start:start,stop:pos,name:14/*error*/,errorHasContent:true,tokenError:true,error:nonLethalError};
						this.errorStack.push(returnValue);
					} else {
						returnValue = {start:start,stop:pos,name:1/*REG_EX*/,isPrimitive:true};
					}
				}
				returnValue.twinfo = twinfo;
            } else if (regex && part[9]) { // this.tagLiterals
                // allows you to use this literally (in places where an expression is allowed) in js:

                // simple tag:
                // <div></div>

                // tree, unary, content, multiline:
                // <foo> <bar>hello </bar> <baz/>
                // </foo>

                // attributes, default true attributes, single and double quotes:
                // <gah this="an" attribute single='quote'/>

                // dynamic content (content normally parsed as js in a sub-parser):
                // <div>{["hello","world"].join(' ')}</div>

                // escaping content with single backslash
                // <div>hah\&lt;\<a{"foo\u0500t\t"+"bar"}</div>

                // note: tag content is escaped (one slash removed), js content is not
                // currently not really possible to use } or > in js code unless you
                // can somehow prefix them with a backslash (strings, regex)
                // if you must have these otherwise the fallback is eval

                var processValue = function(val){
                    // post process dynamic parts of this value
                    // anything wrapped in (unescaped) { and } is considered to be
                    // a literal js expression. so we should parse an expression here
                    // and that's where the voodoo inception starts. we must now
                    // invoke a new instance of ZeParser, make it read an
                    // expression and ensure the next char is the closing curly.
                    // only then is it deemed valid.

                    // ...
                    // too difficult for now. let's just go with "escape all teh curlies!"

                    var arrtxtjs = []; // uneven array. uneven elements are text, even elements are js

                    var last = 0;
                    for (var i=0; i<val.length; ++i) {
                        if (val[i] == '\\') ++i;
                        else if (val[i] == '{') {
                            for (var j=i; j<val.length; ++j) {
                                if (val[j] == '\\') ++j;
                                else if (val[j] == '}') {
                                    var js = val.slice(i+1, j);
                                    arrtxtjs.push(
                                        val.slice(last, i),
                                        js
                                    );
                                    break;
                                }
                            }
                            i = j;
                            last = j + 1;
                        }
                    }
                    // remainder (can be empty string)
                    arrtxtjs.push(val.slice(last, i));

                    if (arrtxtjs.length > 1) { // if we did find any dynamic js block...
                        console.log(["has",arrtxtjs.length,"items",arrtxtjs])
                        for (var i=1; i<arrtxtjs.length; i+=2) {
                            arrtxtjs[i] = arrtxtjs[i].replace(this.regexRemoveEscape, '$1'); // remove a single backslash from the content (it was used as an escape character)
                        }
                        console.log([arrtxtjs])
                        return arrtxtjs; // return array with [string,js,string,js,...]
                    } else { // no dynamic js found, return a string
                        val = arrtxtjs[0].replace(this.regexRemoveEscape, '$1'); // remove a single backslash from the content (it was used as an escape character)
                        return val;
                    }
                };

                var tagOpen = function(node){
                    var regexTagName = this.regexTagName;
                    regexTagName.lastIndex = pos+1;
                    var tag = regexTagName.exec(inp);
                    if (tag) {
                        pos = regexTagName.lastIndex;
                        node.name = tag[1];
                        node.attributes = {};

                        // now fetch all attribute=value pairs
                        var regexTagAttributes = this.regexTagAttributes;
                        var attr = '';
                        var lastIndex = pos = regexTagAttributes.lastIndex = regexTagName.lastIndex;
                        attr = regexTagAttributes.exec(inp);
                        while (attr && attr.index == pos) {
                            if (typeof attr[2] == 'undefined') {
                                // attribute without value assignment (implicit "true")
                                node.attributes[attr[1]] = attr[3];
                            } else {
                                node.attributes[attr[1]] = processValue.call(this, attr[2]);
                            }
                            pos = lastIndex = regexTagAttributes.lastIndex;
                            attr = regexTagAttributes.exec(inp);
                        }

                        // it was a unary tag
                        var regexTagUnarySuffix = this.regexTagUnarySuffix;
                        regexTagUnarySuffix.lastIndex = lastIndex;
                        var x = regexTagUnarySuffix.exec(inp);
                        node.unary = !!x && x.index == pos;
                        if (node.unary) {
                            pos = regexTagUnarySuffix.lastIndex;
                            return true;
                        }
                        // it was a binary tag
                        var regexTagBinarySuffix = this.regexTagBinarySuffix;
                        regexTagBinarySuffix.lastIndex = lastIndex;
                        var x = regexTagBinarySuffix.exec(inp);
                        if (x && x.index == pos) {
                            node.children = [];
                            // now parse strings and other tags until you find a closing tag on the same level...
                            pos = regexTagBinarySuffix.lastIndex;
                            return true;
                        }
                        // i dont know what that was
                        throw console.warn("Error parsing tag");
                        return false;
                    }
                }.bind(this);

                var tagBody = function(node){
                    do {
                        var start = pos;

                        var regexTagBody = this.regexTagBody;
                        regexTagBody.lastIndex = pos;
                        var text = regexTagBody.exec(inp);
                        if (text && text[1]) {
                            var txt = processValue(text[1]);
//              var txt = text[1].replace(this.regexRemoveEscape, '$1'); // remove a single backslash from the content (it was used as an escape character)
                            node.children.push(txt);
                            pos = regexTagBody.lastIndex;
                        }
                        if (inp[pos] == '<') {
                            var regexTagOpenOrClose = this.regexTagOpenOrClose;
                            regexTagOpenOrClose.lastIndex = pos;
                            var x = regexTagOpenOrClose.exec(inp);
                            if (x && x.index == pos) {
                                return node; // end of body
                            }
                            node.children.push(tag({}));
                        }
                    } while (start != pos);
                }.bind(this);

                var tagClose = function(node){
                    var regexTagClose = this.regexTagClose;
                    regexTagClose.lastIndex = pos;
                    var ctag = regexTagClose.exec(inp);
                    if (ctag) {
                        pos = regexTagClose.lastIndex;
                        if (node.name == ctag[1]) return true;
                        return false; // was not expecting to close this tag
                    }

                    // tagClose should only be called if the next chars are starting a closing tag...
                    return false;
                }.bind(this);

                var tag = function(node){
                    if (!tagOpen(node)) {
                        return node;
                    }
                    if (!node.unary) {
                        tagBody(node);
                        tagClose(node);
                    }
                    return node;
                }.bind(this);

                var root = tag({});

                returnValue = {start:start,stop:pos,name:15/*TAG*/,isPrimitive:true,root:root};
            } else {
				// note: operators need to be ordered from longest to smallest. regex will take care of the rest.
				// no need to worry about div vs regex. if looking for regex, earlier if will have eaten it
				//var result = this.regexPunctuators.exec(inp.substring(pos,pos+4));

				// note: due to the regex, the single / or < might be caught by an earlier part of the regex. so check for that.
				var result = part[8] || part[9] || part[10];
				if (result) {
					//result = result[1];
					returnValue = {start:pos,stop:pos+=result.length,name:11/*PUNCTUATOR*/,value:result};
				} else {
					var found = false;
					// identifiers cannot start with a number. but if the leading string would be a number, another if would have eaten it already for numeric literal :)
					while (pos < inp.length) {
						var c = inp[pos];

						if (this.hashAsciiIdentifier[c]) ++pos; //if (this.regexAsciiIdentifier.test(c)) ++pos;
						else if (c == '\\' && this.regexUnicodeEscape.test(inp.substring(pos,pos+6))) pos += 6; // this is like a \uxxxx
						// ok, now test unicode ranges...
						// basically this hardly ever happens so there's little risk of this hitting performance
						// however, if you do happen to have used them, it's not a problem. the parser will support it :)
						else if (this.Unicode) { // the unicode is optional.
							// these chars may not be part of identifier. i want to try to prevent running the unicode regexes here...
							if (this.hashIdentifierStop[c] /*this.regexIdentifierStop.test(c)*/) break;
							// for most scripts, the code wont reach here. which is good, because this is going to be relatively slow :)
							var Unicode = this.Unicode; // cache
							if (!(
									// these may all occur in an identifier... (pure a specification compliance thing :)
									Unicode.Lu.test(c) || Unicode.Ll.test(c) || Unicode.Lt.test(c) || Unicode.Lm.test(c) ||
									Unicode.Lo.test(c) || Unicode.Nl.test(c) || Unicode.Mn.test(c) || Unicode.Mc.test(c) ||
									Unicode.Nd.test(c) || Unicode.Pc.test(c) || Unicode.sp.test(c)
							)) break; // end of match.
							// passed, next char
							++pos;
						} else break; // end of match.

						found = true;
					}

					if (found) {
						returnValue = {start:start,stop:pos,name:2/*IDENTIFIER*/,value:inp.substring(start,pos)};
						if (returnValue.value == 'undefined' || returnValue.value == 'null' || returnValue.value == 'true' || returnValue.value == 'false') returnValue.isPrimitive = true;
					} else {
						if (inp[pos] == '`') {
							returnValue = {start:start,stop:pos+1,name:14/*error*/,tokenError:true,error:Tokenizer.Error.BacktickNotSupported};
							this.errorStack.push(returnValue);
						} else if (inp[pos] == '\\') {
							if (inp[pos+1] == 'u') {
								returnValue = {start:start,stop:pos+1,name:14/*error*/,tokenError:true,error:Tokenizer.Error.InvalidUnicodeEscape};
								this.errorStack.push(returnValue);
							} else {
								returnValue = {start:start,stop:pos+1,name:14/*error*/,tokenError:true,error:Tokenizer.Error.InvalidBackslash};
								this.errorStack.push(returnValue);
							}
						} else {
							returnValue = {start:start,stop:pos+1,name:14/*error*/,tokenError:true,error:Tokenizer.Error.Unknown,value:c};
							this.errorStack.push(returnValue);
							// try to skip this char. it's not going anywhere.
						}
						++pos;
					}
				}
			}

			if (returnValue) {
				// note that ASI's are slipstreamed in here from the parser since the tokenizer cant determine that
				// if this part ever changes, make sure you change that too :)
				returnValue.tokposw = this.wtree.length;
				this.wtree.push(returnValue);
				if (!returnValue.isWhite) {
					returnValue.tokposb = this.btree.length;
					this.btree.push(returnValue);
				}
			}


		} while (stack && returnValue && returnValue.isWhite); // WHITE_SPACE LINETERMINATOR COMMENT_SINGLE COMMENT_MULTI
		++this.tokenCountNoWhite;

		this.pos = pos;

		if (matchedNewline) returnValue.newline = true;
		return returnValue;
	},
