function () {
			var classes = [nsClass('wrapper'), nsClass(++uid)].join(' ');
			
			var markup = jQuery('<q></q>');

			if (this.referenceContainer) {
				markup = jQuery(supplant(
						'<q class="{classes}" data-cite-id="{uid}"></q>',
						{ uid: uid, classes: classes }
				));
			}
			var rangeObject = Aloha.Selection.rangeObject;
			var foundMarkup;

			if (Aloha.activeEditable) {
				jQuery(Aloha.activeEditable.obj[0]).click();
			}

			// Check whether the markup is found in the range (at the start of
			// the range).
			foundMarkup = rangeObject.findMarkup(function () {
				if (this.nodeName && markup.length &&
					(typeof this.nodeName === 'string') &&
					(typeof markup[0].nodeName === 'string')) {
					return this.nodeName.toLowerCase() ===
						markup[0].nodeName.toLowerCase();
				}

				return false;
			}, Aloha.activeEditable.obj);

			// If the we click the quote button on a range that contains quote
			// markup, then we will remove the quote markup, otherwise we will
			// wrap the selection in a quote.

			if (foundMarkup) {
				if (rangeObject.isCollapsed()) {
					// The range is collapsed; remove exactly the one DOM
					// element.
					domUtils.removeFromDOM(foundMarkup, rangeObject, true);
				} else {
					// The range is not collapsed; remove the markup from the
					// range.
					domUtils.removeMarkup(rangeObject, markup,
						Aloha.activeEditable.obj);
				}
			} else {
				// When the range is collapsed, extend it to a word.
				if (rangeObject.isCollapsed()) {
					domUtils.extendToWord(rangeObject);
				}

				domUtils.addMarkup(rangeObject, markup);
			}

			// select the modified range
			rangeObject.select();

			if (this.referenceContainer) {
				this.addCiteToReferences(uid);
			}

			if (this.sidebar && this.settings && this.settings.sidebar &&
			     this.settings.sidebar.open) {
				this.sidebar.open();
			}

			//	.activatePanel(nsClass('sidebar-panel'), markup);

			return false;
		}