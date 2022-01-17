function createWrapItem(element) {
				var wrapItem = dom.create('li', { style: 'list-style-type: none;'});
				dom.insertAfter(wrapItem, element);
				return wrapItem;
			}