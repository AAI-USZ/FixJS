function(e){
						e.stop();

						if(e.key == 'right'){
							self.fireEvent('goRight');
							this.destroy();
						}
						else if (e.key == 'left'){
							self.fireEvent('goLeft');
							this.destroy();
						}
						else if (e.key == 'backspace'){
							self.del();
							this.destroy();
						}
					}