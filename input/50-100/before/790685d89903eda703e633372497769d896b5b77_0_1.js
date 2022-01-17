function(x,y,w,h) {
						if (x!==0 || y!==0 || w!== gl2d.canvas.width || h!== gl2d.canvas.height) {
							gl.enable(gl.SCISSOR_TEST);
							y = gl2d.canvas.height - y - h;
							gl.scissor(x, y, w, h);
						} else {
							gl.disable(gl.SCISSOR_TEST);
						}
					}