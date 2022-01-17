function(selectionTree, rangeObject, markupObject, tagComparator, options) {

			var optimizedSelectionTree, i, el, breakpoint;



			options = options ? options : {};

			// first same tags from within fully selected nodes for removal

			this.prepareForRemoval(selectionTree, markupObject, tagComparator);



			// first let's optimize the selection Tree in useful groups which can be wrapped together

			optimizedSelectionTree = this.optimizeSelectionTree4Markup(selectionTree, markupObject, tagComparator);

			breakpoint = true;



			// now iterate over grouped elements and either recursively dive into object or wrap it as a whole

			for ( i = 0; i < optimizedSelectionTree.length; i++) {

				 el = optimizedSelectionTree[i];

				if (el.wrappable) {

					this.wrapMarkupAroundSelectionTree(el.elements, rangeObject, markupObject, tagComparator, options);

				} else {

					Aloha.Log.debug(this,'dive further into non-wrappable object');

					this.applyMarkup(el.element.children, rangeObject, markupObject, tagComparator, options);

				}

			}

		}