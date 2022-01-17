function(index) {
                    if (this.selectedIndex != index) {
                        var item = this.dropdown.items[index];
						if (!item) return;
						// Style the previously selected item as no longer selected
						if (this.dropdown.selected) {
							this.dropdown.selected.setAttribute('class',item.normalStyle);
							this.dropdown.selected.img.style.visibility = 'hidden';
						}
						// Style this item as selected
						item.setAttribute('class',item.slectedStyle);
						item.img.style.visibility = 'visible';
						this.dropdown.selected = item;
						// Set our index and fire the event
						this.selectedIndex = index;
						this.dropdown.caption.innerHTML = this.options[index].text;
						this.dropdown.hide();
                        window.setTimeout(this.fireEvent,0);
                    }
                }