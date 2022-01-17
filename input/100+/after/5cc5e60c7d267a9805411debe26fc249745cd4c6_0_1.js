function open(title, text, x, y, evt) {
					// console.log(title, text, x, y, evt)
					if (title && text) {
						this.tipTitle.html(title);
						this.tipText.html(text);

						if (x) this.tipContener.css("left", x);
						if (y) this.tipContener.css("top", y);

						this.tipContener.css("height", (this.tipTitle.height() + this.tipText.height()) + "px");

						if (evt.shiftKey)
							this.open2(this.title, this.text, this.x, this.y);
						else 
							this.tOut = setTimeout((function() { this.open2(this.title, this.text, this.x, this.y); }).bind(this), 500);
					}
				}