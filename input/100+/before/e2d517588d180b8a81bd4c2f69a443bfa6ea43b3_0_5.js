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
				"{" + (hash ? ("props:{" + hash + "},") : "") + "path:'" + params + "'" + (passedCtx ? ",ctx:{			];
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
