function() {
										// Style the previously selected item as no longer selected
										if (this.dropdown.selected) {
											this.dropdown.selected.setAttribute('class',this.normalStyle);
											this.dropdown.selected.img.style.visibility = 'hidden';
										}
										// Style this item as selected
										this.setAttribute('class',this.slectedStyle);
										this.img.style.visibility = 'visible';
										this.dropdown.selected = this;
										// Set our index and fire the event
										this.select.setSelectedItem(this.index);
										this.dropdown.hide();
								   }