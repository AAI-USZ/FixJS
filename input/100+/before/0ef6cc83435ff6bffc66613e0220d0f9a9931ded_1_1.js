function(event)
	{
		var myevent = new Event(event);
		if (myevent.target.id === this.textfield.id) {
			if (myevent.type == 'keyup') {
				switch (myevent.key) {
					case 'enter':
						if (this.lielems[this.selected]) {
							this.lielems[this.selected].fireEvent('click');
						}
						event.preventDefault();
						break;
					case 'down':
						this.moveDown();
						event.preventDefault();
						break;
					case 'up':
						this.moveUp();
						event.preventDefault();
						break;
					case 'esc':
						if (this.options.clearChoicesOnEsc) {
							this.clearChoices();
						}
						break;
					default:
						var text = myevent.target.value;
						if (text.length != this.prevlength) { // text length has changed
							if (text.length >= this.options.inputMinLength) { // ..and is long enough
								this.prevlength = text.length;
                                                                                                                                var sr = this.options.filter(text, myevent);
                                                                                                                                if(sr)
                                                                                                                                    this.getValues(sr);
							} else {
								this.clearChoices();
							}
							event.preventDefault();
						}
				}
			} else if (myevent.key == 'enter' || myevent.key == 'esc') { // keydown disabled for those
				//event.preventDefault();
			}else if((myevent.key == 'down' || myevent.key == 'up') && $$('.cwCompleteOuter')[0].getStyle('display') == 'block'){
                                                                event.preventDefault();
                                                }else {
				this.prevlength = myevent.target.value.length; // any other keydown
			}
		}
	}