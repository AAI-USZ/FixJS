function(x,y,w,h) {
						if (x !== 0 || y !== 0 || w !== this.Width() || h !== this.Height()) {
							gl.enable(gl.SCISSOR_TEST);
							y = this.Height() - y - h;
							gl.scissor(x, y, w, h);
						} else {
							gl.disable(gl.SCISSOR_TEST);
						}
					}