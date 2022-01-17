function visitExpressionTok(tok, parentNode, index, isHomogenous){

		var  start = ''
			,end = ''
			,parentParentIsNotEXP = parentNode.parent && parentNode.parent.mode !== EXP;

		if(options.htmlEscape !== false){

			if(tok.type === HTML_RAW){
				escapeStack.push(true);
			}

			if( parentParentIsNotEXP && index === 0 && isHomogenous ){

				if(escapeStack.length === 0){
					start += '( (__vt = ';
				}
			}

			if( parentParentIsNotEXP && index === parentNode.length - 1 && isHomogenous){

				if(escapeStack.length > 0){
					escapeStack.pop();
				} else {
					end += ") != null ? __vt : '' ).toString()\n"
						+ ".replace(__ampre, __amp)\n"
						+ ".replace(__ltre, __lt)\n"
						+ ".replace(__gtre, __gt)\n"
						+ ".replace(__quotre, __quot) \n";
				}
			}
		}

		if(parentParentIsNotEXP && (index === 0 || (index === 1 && parentNode[0].type === HTML_RAW) ) ){
			insertDebugVars(tok);
			start = "__vo.push(" + start;
		}

		if(
			parentParentIsNotEXP
			&& (index === parentNode.length - 1
				|| (index === parentNode.length - 2
					&& parentNode[ parentNode.length - 1 ].type === HTML_RAW) )
		){
			end += "); \n";
		}

		if(tok.type !== HTML_RAW){
			buffer.push( start + tok.val.replace(reQuote, '"').replace(reEscapedQuote, '"') + end );
		}

		if(parentParentIsNotEXP && index === parentNode.length - 1){
			insertDebugVars(tok);
		}
	}