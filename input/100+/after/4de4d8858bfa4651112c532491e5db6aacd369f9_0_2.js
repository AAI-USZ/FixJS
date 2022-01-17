function (node, className, substring) {
			if (node && node.className) {
				var classes = node.className.trim().split(' ');
				var newClasses = [];
				for (var i = classes.length; --i >= 0;) {
					if ((!substring && classes[i] != className) || (substring && classes[i].indexOf(className) != 0)) {
						newClasses[newClasses.length] = classes[i];
					}
				}
				if (newClasses.length) {
					node.className = newClasses.join(' ');
				} else {
					if (!Ext.isOpera) {
						node.removeAttribute('class');
						if (HTMLArea.isIEBeforeIE9) {
							node.removeAttribute('className');
						}
					} else {
						node.className = '';
					}
				}
			}
		}