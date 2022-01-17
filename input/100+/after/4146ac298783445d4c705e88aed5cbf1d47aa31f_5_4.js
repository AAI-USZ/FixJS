function(selector, refNodes) {
			if(!selector)return false;
			if(selector === "*")return true;

			var thisObj,
				parent,
				i,
				k = 0,
				str,
				rules,
				tmp,
				match;

			if(refNodes) {
				if("length" in refNodes) {//fast and unsafe isArray
					thisObj = refNodes[0];
				}
				else {
					thisObj = refNodes;
					refNodes = void 0;
				}
			} 
			else thisObj = this;

			do {
				match = false;
				if(thisObj === document.documentElement)match = selector === ":root";
	  			else if(thisObj === document.body)match = selector.toUpperCase() === "BODY";

				if(!match) {
					selector = _String_trim.call(selector.replace(RE__matchSelector__doubleSpaces, "$1"));

					if(rules = selector.match(RE__selector__easySelector)) {
						switch (selector.charAt(0)) {
							case '#':
								match = thisObj.id === selector.slice(1);
							break;
							default:
								match = !rules[1] || (!("tagName" in thisObj) || thisObj.tagName.toUpperCase() === rules[1].toUpperCase());
								if(match && rules[2]) {
									i = -1;
									tmp = rules[2].slice(1).split(".");
									str = " " + thisObj.className + " ";
									while(tmp[++i] && match) {
										match = _String_contains.call(str, " " + tmp[i] + " ");
									}
								}
						}
					}
					
					if(!/([,>+~ ])/.test(selector) && (parent = thisObj.parentNode) && parent.querySelector) {
						match = parent.querySelector(selector) === thisObj;
					}

					if(!match && (parent = thisObj.ownerDocument)) {
						tmp = parent.querySelectorAll(selector);
						i = -1;
						while(!match && tmp[++i]) {
					        match = tmp[i] === thisObj;
					    }
					}
				}
			}
			while(match && refNodes && (thisObj = refNodes[++k]));

		    return refNodes && "length" in refNodes ? match && refNodes.length == k : match;
		}