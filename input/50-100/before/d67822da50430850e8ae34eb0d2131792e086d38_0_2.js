function (ancestor) {
				if (Ext.isIE8 || Ext.isIE7 || Ext.isIE6) {
					isFullySelected = (type !== 'Control' && ancestor.innerText == range.text) || (type === 'Control' && ancestor.innerText == range.item(0).text);
				} else {
					isFullySelected = (ancestor.textContent == range.toString());
				}
				if (isFullySelected) {
					node = ancestor;
					return false;
				}
			}