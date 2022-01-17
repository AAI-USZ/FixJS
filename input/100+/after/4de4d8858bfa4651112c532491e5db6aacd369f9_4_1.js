function clearStyle(node) {
			var style = HTMLArea.isIEBeforeIE9 ? node.style.cssText : node.getAttribute('style');
			if (style) {
				var declarations = style.split(/\s*;\s*/);
				for (var i = declarations.length; --i >= 0;) {
					if (/^mso|^tab-stops/i.test(declarations[i]) || /^margin\s*:\s*0..\s+0..\s+0../i.test(declarations[i])) {
						declarations.splice(i, 1);
					}
				}
				node.setAttribute('style', declarations.join('; '));
			}
		}