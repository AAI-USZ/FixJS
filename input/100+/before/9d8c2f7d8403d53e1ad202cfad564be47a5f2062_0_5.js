function tmplFn(markup, tmpl, bind) {
		// Compile markup to AST (abtract syntax tree) then build the template function code from the AST nodes
		// Used for compiling templates, and also by JsViews to build functions for data link expressions
		var newNode, node, i, l, code, hasTag, hasEncoder, getsValue, hasConverter, hasViewPath, tag, converter, params, hash, nestedTmpl, allowCode,
			tmplOptions = tmpl ? {
				allowCode: allowCode = tmpl.allowCode,
				debug: tmpl.debug
			} : {},
			nested = tmpl && tmpl.tmpls,
			astTop = [],
			loc = 0,
			stack = [],
			content = astTop,
			current = [, , , astTop],
			nestedIndex = 0;

		//==== nested functions ====
		function pushPreceedingContent(shift) {
			shift -= loc;
			if (shift) {
				content.push(markup.substr(loc, shift).replace(rNewLine, "\\n"));
			}
		}

		function parseTag(all, tagName, converter, colon, html, code, params, slash, closeBlock, index) {
			//                  tag           converter colon  html  code     params         slash   closeBlock
			//      /{{(?:(?:(\w+(?=[\/!\s\}!]))|(?:(\w+)?(:)|(?:(>)|(\*)))((?:[^\}]|}(?!}))*?)(\/)?|(?:\/(\w+)))}}/g;
			// Build abstract syntax tree (AST): [ tagName, converter, params, content, hash, contentMarkup ]
			if (html) {
				colon = ":";
				converter = "html";
			}
			var hash = "",
				passedCtx = "",
				// Block tag if not self-closing and not {{:}} or {{>}} (special case) and not a data-link expression (has bind parameter)
				block = !slash && !colon && !bind;

			//==== nested helper function ====

			tagName = tagName || colon;
			pushPreceedingContent(index);
			loc = index + all.length; // location marker - parsed up to here
			if (code) {
				if (allowCode) {
					content.push(["*", params.replace(rUnescapeQuotes, "$1")]);
				}
			} else if (tagName) {
				if (tagName === "else") {
					current[5] = markup.substring(current[5], index); // contentMarkup for block tag
					current = stack.pop();
					content = current[3];
					block = TRUE;
				}
				params = (params
				? parseParams(params, bind)
					.replace(rBuildHash, function(all, isCtx, keyValue) {
						if (isCtx) {
							passedCtx += keyValue + ",";
						} else {
							hash += keyValue + ",";
						}
						return "";
					})
				: "");
				hash = hash.slice(0, -1);
				params = params.slice(0, -1);
				newNode = [
				tagName,
				converter || "",
				params,
				block && [],
				"{" + (hash ? ("props:{" + hash + "},") : "") + "path:'" + params + "'" + (passedCtx ? ",ctx:{" + passedCtx.slice(0, -1) + "}" : "") + "}"
			];
				if (block) {
					stack.push(current);
					current = newNode;
					current[5] = loc; // Store current location of open tag, to be able to add contentMarkup when we reach closing tag
				}
				content.push(newNode);
			} else if (closeBlock) {
				//if ( closeBlock !== current[ 0 ]) {
				//	throw "unmatched close tag: /" + closeBlock + ". Expected /" + current[ 0 ];
				//}
				current[5] = markup.substring(current[5], index); // contentMarkup for block tag
				current = stack.pop();
			}
			if (!current) {
				throw "Expected block tag";
			}
			content = current[3];
		}
		//==== /end of nested functions ====

		markup = markup.replace(rEscapeQuotes, "\\$1");

		// Build the AST (abstract syntax tree) under astTop
		markup.replace(rTag, parseTag);

		pushPreceedingContent(markup.length);

		// Use the AST (astTop) to build the template function
		l = astTop.length;
		code = (l ? "" : '"";');

		for (i = 0; i < l; i++) {
			// AST nodes: [ tagName, converter, params, content, hash, contentMarkup ]
			node = astTop[i];
			if ("" + node === node) { // type string
				code += '"' + node + '"+';
			} else if (node[0] === "*") {
				code = code.slice(0, i ? -1 : -3) + ";" + node[1] + (i + 1 < l ? "ret+=" : "");
			} else {
				tag = node[0];
				converter = node[1];
				params = node[2];
				content = node[3];
				hash = node[4];
				markup = node[5];
				if (content) {					// Create template object for nested template
					nestedTmpl = TmplObject(markup, tmplOptions, tmpl, nestedIndex++);
					// Compile to AST and then to compiled function
					tmplFn(markup, nestedTmpl);
					nested.push(nestedTmpl);
				}
				hasViewPath = hasViewPath || hash.indexOf("view") > -1;
				code += (tag === ":"
				? (converter === "html"
					? (hasEncoder = TRUE, "e(" + params)
					: converter
						? (hasConverter = TRUE, 'c("' + converter + '",view,this,' + params)
						: (getsValue = TRUE, "((v=" + params + ')!=u?v:""')
				)
				: (hasTag = TRUE, 't("' + tag + '",view,this,"' + (converter || "") + '",'
					+ (content ? nested.length : '""') // For block tags, pass in the key (nested.length) to the nested content template
					+ "," + hash + (params ? "," : "") + params))
					+ ")+";
			}
		}
		code = fnDeclStr
		+ (getsValue ? "v," : "")
		+ (hasTag ? "t=j._tag," : "")
		+ (hasConverter ? "c=j._convert," : "")
		+ (hasEncoder ? "e=j.converters.html," : "")
		+ "ret; try{\n\n"
		+ (tmplOptions.debug ? "debugger;" : "")
		+ (allowCode ? 'ret=' : 'return ')
		+ code.slice(0, -1) + ";\n\n"
		+ (allowCode ? "return ret;" : "")
		+ "}catch(e){return j._err(e);}";

		try {
			code = new Function("data, view, j, b, u", code);
		} catch (e) {
			syntaxError("Error in compiled template code:\n" + code, e);
		}

		// Include only the var references that are needed in the code
		if (tmpl) {
			tmpl.fn = code;
		}
		return code;
	}
