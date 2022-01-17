function() {
		var media = this.source;

		if (!gl || !media || !media.height || !media.width) {
			return;
		}

		if (!this.initialized) {
			this.initialize();
		}

		if (media.currentTime === undefined) {
			media.currentTime = 0;
		}
		this.currentTime = media.currentTime;

		if (!this.allowRefresh) {
			return;
		}

		if (this.lastRenderTime === undefined || this.lastRenderTime !== this.currentTime) {
			gl.bindTexture(gl.TEXTURE_2D, this.sourceTexture);
			gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this.flip);
			try {
				gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, media);
			} catch (securityError) {
				if (securityError.name === 'SECURITY_ERR') {
					this.allowRefresh = false;
					console.log('Unable to access cross-domain image');
				}
			}

			this.lastRenderTime = this.currentTime;
			this.dirty = true;

		}

		if (this.transformed) {
			if (!this.frameBuffer) {
				this.initFrameBuffer();
			}
			this.texture = this.frameBuffer.texture;
			this.uniforms.source = this.sourceTexture;
			if (this.dirty) {
				draw(baseShader, rectangleModel, this.uniforms, this.frameBuffer.frameBuffer, this);
			}
		} else {
			this.texture = this.sourceTexture;
		}
		this.dirty = false;
	}