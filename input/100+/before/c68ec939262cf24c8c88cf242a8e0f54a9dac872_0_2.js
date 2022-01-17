function(index) {
                    if (this.selectedIndex != index) {
                        this.selectedIndex = index;
						this.dropdown.caption.innerHTML = this.options[index].text;
						
                        window.setTimeout(this.fireEvent,0);
                    }
                }