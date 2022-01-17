function cloneCell(cell) {

			var formatNode;



			// Clone formats

			tinymce.walk(cell, function(node) {

				var curNode;



				if (node.nodeType == 3) {

					each(dom.getParents(node.parentNode, null, cell).reverse(), function(node) {

						node = cloneNode(node, false);



						if (!formatNode)

							formatNode = curNode = node;

						else if (curNode)

							curNode.appendChild(node);



						curNode = node;

					});



					// Add something to the inner node

					if (curNode)

						curNode.innerHTML = tinymce.isIE ? '&nbsp;' : '<br data-mce-bogus="1" />';



					return false;

				}

			}, 'childNodes');



			cell = cloneNode(cell, false);

			setSpanVal(cell, 'rowSpan', 1);

			setSpanVal(cell, 'colSpan', 1);



			if (formatNode) {

				cell.appendChild(formatNode);

			} else {

				if (!tinymce.isIE)

					cell.innerHTML = '<br data-mce-bogus="1" />';

			}



			return cell;

		}