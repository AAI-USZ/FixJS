function() {
		var video = this.source;

		if (!gl || !video || !video.videoHeight || !video.videoWidth || video.readyState < 2) {
			return;
		}

		if (!this.initialized) {
			this.initialize();
		}
		
		if (!this.allowRefresh) {
			return;
		}

		if (this.lastRenderFrame !== video.mozPresentedFrames ||
			this.lastRenderTime !== video.currentTime) {

			gl.bindTexture(gl.TEXTURE_2D, this.sourceTexture);
			gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this.flip);
			try {
				gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
			} catch (securityError) {
				if (securityError.name === 'SECURITY_ERR') {
					this.allowRefresh = false;
					console.log('Unable to access cross-domain image');
				}
			}

			if (this.transformed) {
				if (!this.frameBuffer) {
					this.initFrameBuffer();
				}
				this.texture = this.frameBuffer.texture;
				this.uniforms.source = this.sourceTexture;
				draw(baseShader, rectangleModel, this.uniforms, this.frameBuffer.frameBuffer, this);
			} else {
				this.texture = this.sourceTexture;
			}

			this.lastRenderTime = this.currentTime;

			this.lastRenderTime = video.currentTime;
			this.lastRenderFrame = video.mozPresentedFrames;

			this.dirty = false;
		}
	}