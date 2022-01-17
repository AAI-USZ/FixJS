function (ancestor) {
				if (HTMLArea.isIEBeforeIE9) {
					isFullySelected = (type !== 'Control' && ancestor.innerText == range.text) || (type === 'Control' && ancestor.innerText == range.item(0).text);
				} else {
					isFullySelected = (ancestor.textContent == range.toString());
				}
				if (isFullySelected) {
					node = ancestor;
					return false;
				}
			}