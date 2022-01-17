function(selector) {
			if(!selector)return false;
			if(selector === "*")return true;
			if(selector === ":root" && this === document.documentElement)return true;
			if(selector === "body" && this === document.body)return true;

			var thisObj = this,
				parent,
				i,
				str,
				rules,
				tmp,
				match = false;

			selector = _String_trim.call(selector.replace(RE__matchSelector__doubleSpaces, "$1"));

			if(rules = selector.match(RE__selector__easySelector)) {
				switch (selector.charAt(0)) {
					case '#':
						return thisObj.id === selector.slice(1);
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
						return match;
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
		    return match;
		}