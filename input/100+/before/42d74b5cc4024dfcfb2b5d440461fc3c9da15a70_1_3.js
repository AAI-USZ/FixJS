function(event) {
								var actionWidth = actionBar.calculateActionWidths(),
									i,
									action,
									actionType,
									length = this.shownActions.length,
									margins = 2;
								for (i = 0; length; i++) {
									action = this.shownActions[i];
									actionType = (action.hasAttribute('data-bb-style')) ? action.getAttribute('data-bb-style').toLowerCase() : 'button';
									// Compute margins
									margins = (actionType == 'tab') ? 2 : 0;
									action.style.width = (actionWidth - margins) + 'px'; 
								}
								// Adjust our more button
								if (this.moreBtn && (this.shownActions.length > 0)) {
									if (actionType == 'tab') {
										// Stretch the last button if all tabs are before the overflow button  
										this.moreBtn.style.width = (this.getTotalWidth() - (this.shownActions.length * actionWidth)) + 'px';
									} else {
										this.moreBtn.style.width = this.actionOverflowBtnWidth + 'px'; 
									}
								}
							}