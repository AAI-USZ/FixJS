function () {
				if (that.activeTable) {
					// look if table object has a child caption
					if ( that.activeTable.obj.children("caption").is('caption') ) {
						that.activeTable.obj.children("caption").remove();
						// select first cell of table
					} else {
						var captionText = i18n.t('empty.caption');
						var c = jQuery('<caption></caption>');
						that.activeTable.obj.prepend(c);
						that.makeCaptionEditable(c, captionText);

						// get the editable span within the caption and select it
						var cDiv = c.find('div').eq(0);
						var captionContent = cDiv.contents().eq(0);
						if (captionContent.length > 0) {
							var newRange = new GENTICS.Utils.RangeObject();
							newRange.startContainer = newRange.endContainer = captionContent.get(0);
							newRange.startOffset = 0;
							newRange.endOffset = captionContent.text().length;

							// blur all editables within the table
							that.activeTable.obj.find('div.aloha-table-cell-editable').blur();

							cDiv.focus();
							newRange.select();
							Aloha.Selection.updateSelection();
						}
					}
				}
			}