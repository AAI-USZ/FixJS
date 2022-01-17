function (event) {
							//gaisho modified.
//							var key = event.keyCode || event.which;
//							if(key == 27) { this.value = t; this.blur(); return; }
//							else if(key == 13) { this.blur(); return; }
//							else {
//								h2.width(Math.min(h1.text("pW" + this.value).width(),w));
//							}
							var key = event.keyCode || event.which;
							if(key === 27) { this.value = t; this.blur(); return; }
							
						}