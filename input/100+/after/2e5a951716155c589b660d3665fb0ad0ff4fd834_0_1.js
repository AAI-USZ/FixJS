function(x, y, color) {
		var i = (Math.round(x) + Math.round(y) * this.canvas.width) * 4;
		var blend = this.getBlendFunction(this.globalBlendMode);

		if (typeof color.a === 'undefined') {
			color.a = 255;
		}

		var alpha_dst = this.imageData.data[i + 3] / 255;
		var alpha_src  = color.a * context.globalAlpha / 255;

		this.imageData.data[i]     = blend.component(color.r, this.imageData.data[i],  alpha_src, alpha_dst);
		this.imageData.data[i + 1] = blend.component(color.g, this.imageData.data[i+1], alpha_src, alpha_dst);
		this.imageData.data[i + 2] = blend.component(color.b, this.imageData.data[i+2], alpha_src, alpha_dst);
		this.imageData.data[i + 3] = blend.alpha(alpha_src, alpha_dst) * 255;

		_imageData2DPixel.data[0]  = (this.imageData.data[i] - this.range.r.low) / (this.range.r.high - this.range.r.low) * 255;
		_imageData2DPixel.data[1]  = (this.imageData.data[i + 1] - this.range.g.low) / (this.range.g.high - this.range.g.low) * 255;
		_imageData2DPixel.data[2]  = (this.imageData.data[i + 2] - this.range.b.low) / (this.range.b.high - this.range.b.low) * 255;
		_imageData2DPixel.data[3]  = (this.imageData.data[i + 3] - this.range.a.low) / (this.range.a.high - this.range.a.low) * 255;

		this._context.putImageData(_imageData2DPixel, x, y);
	}