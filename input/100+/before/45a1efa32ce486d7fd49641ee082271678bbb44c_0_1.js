function(context) {
				if (gl2d.gl) return gl2d.gl;

				if (context === "2d" && !(canvas.width === 0 || canvas.height === 0)) {
					var gl = gl2d.gl = gl2d.canvas.$getContext("webgl", {alpha: false}) || gl2d.canvas.$getContext("experimental-webgl", {alpha: false});

					if ((typeof(gl) === "undefined") || (gl === null)) {
						return gl2d.canvas.$getContext("2d");
					}

					try {
						gl2d.initShaders();
						gl2d.initBuffers();
					} catch (e) {
						//TODO!

						var c = document.createElement("canvas");

						c.width = gl2d.canvas.width;
						c.height = gl2d.canvas.height;
						c.id = gl2d.canvas.id;
						c.onclick = function() {
							this.focus();
						}

						var parent = gl2d.canvas.parentNode;

						parent.removeChild(gl2d.canvas);	
						parent.insertBefore(c, parent.firstChild);

						window.onload();				

						return c.getContext("2d");

					}

					gl2d.initCanvas2DAPI();

					gl.viewport(0, 0, gl2d.canvas.width, gl2d.canvas.height);

					gl.clearColor(0, 0, 0, 1);
					gl.clear(gl.COLOR_BUFFER_BIT);

					gl.enable(gl.BLEND);
					gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

					gl2d.maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);

					//mojo hack
					gxtkGraphics.prototype.DrawSurface = function(surface,x,y) {
						if (!surface.image.complete) return;			
						this.gc.drawImage(surface.image,x,y);
					}

					gxtkGraphics.prototype.DrawSurface2 = function(surface,x,y,srcx,srcy,srcw,srch) {
						if (!surface.image.complete) return;

						if (srcw < 0) { srcx+=srcw;srcw=-srcw; }
						if (srch < 0) { srcy+=srch;srch=-srch; }
						if (srcw <= 0 || srch <= 0) return;

						this.gc.drawImage( surface.image,srcx,srcy,srcw,srch,x,y,srcw,srch );
					}

					gxtkGraphics.prototype.SetScissor = function(x,y,w,h) {
						if (x !== 0 || y !== 0 || w !== this.Width() || h !== this.Height()) {
							gl.enable(gl.SCISSOR_TEST);
							y = this.Height() - y - h;
							gl.scissor(x, y, w, h);
						} else {
							gl.disable(gl.SCISSOR_TEST);
						}
					}

					return gl;
				} else {
					return gl2d.canvas.$getContext(context);
				}

			}