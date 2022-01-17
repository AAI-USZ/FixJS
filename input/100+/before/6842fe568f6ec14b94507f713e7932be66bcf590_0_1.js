function (text, parentElement) {

	var stream, inHtml;

	if (typeof text == "string") {

		var txtStream = {

				next : function() {

					if ( ++this.count == 1) {

						return text;

					} else {

						throw StopIteration;

					}

				},

				count : 0,

				text : text

		};

		stream = Tokenizer.stringStream(txtStream);

	} else {

		stream = text;

		inHtml = true;

	}

	var parser = CSSParser.make(stream);

	var token;

	var selector;

	var combined;

	var combiner = ' ';

	var errors = [];

	var models = [];

	var model, wsAfterSel;

	function error(text) {

		console.log("ERROR: " + text);

		errors.push(text);

	}



	function nextToken() {

		var start,

			stop,

			s;



		token = parser.next();

		var commentStart = false;

		while (token.style == "css-comment" || token.style == "whitespace" /*||

				(token.content == '/' && stream.peek() == '/')*/) {

			if (token.style == "css-comment" || commentStart) {

				if (! pushComment) {

					pushComment = new Comment();

				}

				s = token.content;

				if (token.content.indexOf("/*") === 0) { // start block comment

					s = s.substring(2);

					commentStart = true;

					pushComment.addComment('block', start, stop, "" /*s*/);

				} 

				if ((s.lastIndexOf("*/") > -1) && (s.lastIndexOf("*/") == s.length - 2)) { // end block comment

					s = s.substring(0, s.length - 2);

					commentStart = false;

				}

				pushComment.appendComment(s);

			} /*else if (token.content == '/') { // double slash comment to EOF

				start = token.offset;

				parser.next();// second slash

				if (! pushComment) {

					pushComment = new Comment();

				}

				while (!stream.endOfLine()) {

					stream.next();

				}

				s = stream.get();

				pushComment.addComment('line', start, start + s.length, s);

			} */

			token = parser.next();

		}

		return token;

	}



	function createSelector() {

		selector = new CSSSelector();

		selector.startOffset = token.offset;

		selector.parent = model;

		// selector.setStart(nexttoken.line,nexttoken.from);

		if (combined) {

			combined.selectors.push(selector);

			selector.parent = combined;

		} else {

			model.selectors.push(selector);

		}

	}



	function startNew() {

		var prev = selector;

		prev.endOffset = token.offset - 1;

		if (!combined) {

			combined = new CSSCombinedSelector();

			combined.parent = model;

			combined.selectors.push(prev);

			selector.startOffset = prev.startOffset;

			model.selectors[model.selectors.length - 1] = combined;

		}

		createSelector();

		combined.combiners.push(combiner);

		combiner = ' ';

	}



	var wasSelector;



	try {

		do {

			nextToken();

			switch (token.style) {

			case "css-selector":

			case "css-select-op":

				if (inHtml && token.content == "<") {

					stream.push("<");

					throw StopIteration;

				}

				model = new CSSRule();

				models.push(model);

				model.startOffset = token.offset;



				if (parentElement) {

					parentElement.addChild(model, undefined, true);

				}



				wsAfterSel = false;

				combined = undefined;

				combiner = ' ';

				createSelector();



				selectorLoop: for (;;) {



					switch (token.style) {

					case "css-select-op":

						switch (token.content) {

							case ",":

								combined = undefined;

								wasSelector = false;

								createSelector();

								break;



							case ".":

								if (wsAfterSel) {

									startNew();

								}

								nextToken();

								if (selector.cls) {

									selector.cls = selector.cls + "." + token.content;

								} else {

									selector.cls = token.content;

								}

								wsAfterSel = token.value.length > token.content.length;

								break;



							case "*":

								if (selector.element || selector.cls) {

									startNew();

								}

								selector.element = "*";

								break;



							case "+":

							case ">":

								combiner = token.content;

								startNew();

								break;

						} // END inner switch

						break;

					// END case css-select-op



					case "css-selector":

						if (token.type == "css-identifier") {

							if (selector.element || selector.cls) {

								startNew();

							}

							selector.element = token.content;



						} else if (token.type == "css-hash") {

							if (selector.id || wsAfterSel) {

								startNew();

							}

							selector.id = token.content.substring(1);

						}

						wsAfterSel = token.value.length > token.content.length;

						break;



					case "css-punctuation":

						if (token.content == "{") {

							break selectorLoop;

						} else if (token.content == ":") {

							nextToken();

							if (token.content == ":") {

								nextToken();

								selector.pseudoElement = token.content;

							} else {

								selector.pseudoRule = token.content;

							}

						} else if (token.content == "[") {

							nextToken();

							selector.attribute = {

									name : token.content

							};

							nextToken();

							if (token.content === '=' || token.content === '~=' ||

									token.content === '|=') {

								selector.attribute.type = token.content;

								nextToken();

								selector.attribute.value = token.content

										.substring(1, token.content.length - 1);

								nextToken(); // ]

							}

						}

					// END case css-punctuation

					break;

					} // END inner switch(token.style)

					wasSelector = true;

					nextToken();

				} // END selectorLoop for(;;) loop

				if (pushComment) { //#2166 comments before this CSSRule in the css file ex block comment before

					model.comment = pushComment;

					pushComment = null;

				}

				selector.endOffset = token.offset - 1;

				while (nextToken().content != "}") {

					var nameOffset = token.offset;

					var propertyName = token.content;

					var skipNext = false;

					if (token.type == "css-hash") {

						nextToken();

						if (token.type == "css-identifier") {

							propertyName += token.content;

						}else {

							skipNext = true;

						}

					} else if (token.type != "css-identifier") {

						if (token.content != "*") { // is probably bad syntax,

							// but dojo.css has "

							// *font-size "

							error("expecting identifier around " +selector.getText()+ "{ "+property.name + ": "+ propery.value);

						} else {

							nextToken();

							propertyName += token.content;

						}

					}

					var property = new CSSProperty();

					property.startOffset = nameOffset;

					property.parent = model;

					if (pushComment) { //#2166

						property.comment = pushComment;

						pushComment = null;

					}

					// property.setStart(nexttoken.line,nexttoken.from);

					model.properties.push(property);

					model.addChild(property, undefined, true);

					property.name = propertyName;

					if (!skipNext) {

						if (nextToken().content != ":")  {

							error("expecting ':' " +selector.getText()+ "{ "+property.name + ": "+ propery.value);

						}

					}

					nextToken();

					property.value = token.value;



					if (property.value == "url") { 

						// urls can contain data: urls #2057, so go until )

						while ((nextToken()).content != ")") {

							property.value += token.value;

						}

						property.value += token.value; // add the ')' that stoped the loop

					}



					while ((nextToken()).content != ";" && token.content != "}") {

						property.value += token.value;

					}



					if (pushComment) {

						property.postComment = pushComment;

						pushComment = null;

					}

					property.endOffset = token.offset - 1;

					if (token.content == "}") {

						break;

					}

				} // END while (nextToken().content != '}')



				if (pushComment) {

					property.postComment = pushComment;

					pushComment = null;

				}

				model.endOffset = token.offset;

				// END case css-selector, css-select-op

				break;



			case "css-at":

				var ruleName = token.content.substring(1);

				var atRule = (ruleName == "import") ? new CSSImport()

				: new CSSAtRule();

				atRule.startOffset = token.offset;



				if (parentElement) {

					parentElement.addChild(atRule, undefined, true);

				}



				if (ruleName == "import") {

					var cssImport = atRule;

					nextToken();

					if (token.content == "url") {

						cssImport.isURL = true;

						nextToken(); // '

						nextToken(); // value

					}

					cssImport.url = token.content.substring(1, token.content.length - 1);

					if (cssImport.isURL) {

						nextToken();

					}

					nextToken(); // ;

				} else if ( ruleName.indexOf("keyframes") >= 0 ) { 

					var animationName = "";

					var spacer = "";

					var needToIndent = false;

					var indentation = "\t\t";

					nextToken(); // get animation-name identifier

					animationName = token.content;

					/*

					 * work around dojox bug where animation-name is set to a selector instead of an identifier

					 */

					if ( animationName == ".") {

						nextToken();

						animationName += token.content;

					}

					nextToken(); // rule opening "{"

					atRule.value = token.content + "\n";

					nextToken();

					if ( token.content.indexOf("from") >= 0 || 

							token.content.indexOf("to") >= 0  || 

							token.content.indexOf("%") >= 0 

					) { // eat from, to and nn% selectors

						outerLoop: for ( ; ; ) { 

							atRule.value += "\t" + token.content + " "; // append keyframe selector 

							nextToken(); // "{"

							atRule.value += token.content + "\n";

							while ((nextToken()).content != "}") {

								if ( needToIndent ) { indentation = "\t\t";  needToIndent = false; }

								if ( token.content == ";" ) { 

									spacer = "\n"; 

									needToIndent = true; 

								} else if ( token.content == ":" || token.content == ")" ) {

									spacer = " ";

								}

								atRule.value += indentation + token.content + spacer;

								spacer = "";

								indentation = "";

							}

							atRule.value += "\t" + token.content + "\n"; // grab closing brace

							nextToken();

							if ( token.content == "}" ) { // if rule closing brace

								break outerLoop;

							}

						}

					} else {

						error("inside keyframes decl expecting from/to blocks or nn% blocks");

					}

					atRule.value += token.content;

					atRule.name = ruleName + " " + animationName;

				} else {

					atRule.name = ruleName;

					atRule.value = "";

					while ((nextToken()).content != ";") {

						atRule.value += token.content;

					}

				}

				atRule.endOffset = token.offset;

				break;

			// END case css-at



			} // END outer switch(token.style)

		} while (true);

	} catch (e) {

		if (pushComment && model) { //#2166 comments after last CSSRUle this CSSRule in the css file ex block comment 

			model.postComment = pushComment;

			pushComment = null;

		}

	}

	return {errors:errors, model: models}
};
