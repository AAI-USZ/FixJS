function(target, source) {
		if (typeof(source) == "string") {
			var target = $(target);
			var rel = $(target).getAttribute('rel');
			if (rel && rel.length > 0) {
				if ((matches=/call:([^\(]+)\(([^\)]+)\)/g.exec(rel))) {
					var func = eval(matches[1]);
					try {
						func.apply(window, matches[2].split(/,/).concat([(source || "")]));
					} catch(e) {
						console.log("error calling history function "+matches[1]+"\nReason: ", e);
					}
				} else {
					if ($(rel)) {
						Builder.setCode(rel, source || "");
					} else {
						Builder.setCode(target, source || "");
					}
				}
			} else {
				if (target.tagName != null && target.tagName.toLowerCase() == "input" && (source.innerHTML || source.value)) {
					target.value = source || "";
				} else if (!target.tagName || target.tagName.toLowerCase() != "input") {
					Builder.setCode(target, source || "");
				}
			}	
		} else if (source.tagName.toLowerCase() == "textarea") {
			target.setCode(source.value);
		} else if (target.tagName != null && target.tagName.toLowerCase() == "input" && source.tagName.toLowerCase() == "input") {
			target.value = source.value;
		} else {
			
			var pos = 0;
			source.up().childElements().each(function(item, key){
				if (item == source) pos = key;
			});
			if (source.tagName.toLowerCase() == "code") {
				while (source != null && source.up().up().previous() && (source.innerHTML.length <= 0 && (source.value == null || source.value.length <= 0))) source = source.up().up().previous().down("a code", pos);
			}
			if (source != null) {
				var target = $(target);
				var rel = $(target).getAttribute('rel');
				if (rel && rel.length > 0) {
					if ((matches=/call:([^\(]+)\(([^\)]+)\)/g.exec(rel))) {
						var func = eval(matches[1]);
						try {
							func.apply(window, matches[2].split(/,/).concat([(source.innerText || source.innerHTML || source.value || "")]));
						} catch(e) {
							console.log("error calling history function "+matches[1]+"\nReason: ", e);
						}
					} else {
						if ($(rel)) {
							Builder.setCode(rel, source.innerText || source.innerHTML || source.value || "");
						} else {
							Builder.setCode(target, source.innerText || source.innerHTML || source.value || "");
						}
					}
				} else {
					if (target.tagName != null && target.tagName.toLowerCase() == "input" && (source.innerHTML || source.value)) {
						target.value = source.innerHTML || source.value;
					} else if (!target.tagName || target.tagName.toLowerCase() != "input") {
						Builder.setCode(target, source.innerText || source.innerHTML || source.value || "");
					}
				}
			}
		}
	}