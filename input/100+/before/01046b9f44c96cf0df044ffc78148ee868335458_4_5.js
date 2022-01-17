function indentLI(element) {
				if (!hasParentInList(ed, element, indented)) {
					element = splitNestedLists(element, dom);
					var wrapList = createWrapList(element);
					wrapList.appendChild(element);
					attemptMergeWithAdjacent(wrapList.parentNode, false);
					attemptMergeWithAdjacent(wrapList, false);
					indented.push(element);
				}
			}