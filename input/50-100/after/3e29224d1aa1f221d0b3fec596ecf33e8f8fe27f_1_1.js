function (element, event) {
					// Only change the error message when there is a keypress that will change the actual field value (versus navigating there)
					if ((event.keyCode < 9 || event.keyCode > 45)/* && !event.shiftKey && (element.name in this.submitted || element === this.lastElement)*/) {
						this.element(element);
					}
				}