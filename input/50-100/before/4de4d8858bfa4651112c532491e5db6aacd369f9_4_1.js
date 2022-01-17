function clearClass(node) {
			var newc = node.className.replace(/(^|\s)mso.*?(\s|$)/ig,' ');
			if (newc != node.className) {
				node.className = newc;
				if (!/\S/.test(node.className)) {
					if (!Ext.isOpera) {
						node.removeAttribute('class');
						if (Ext.isIE) {
							node.removeAttribute('className');
						}
					} else {
						node.className = '';
					}
				}
			}
		}