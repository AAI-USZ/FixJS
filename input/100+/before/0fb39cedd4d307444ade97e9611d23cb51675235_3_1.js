function (e) {
			var font = this._textFont["type"] + ' ' + this._textFont["weight"] + ' ' +
				this._textFont["size"] + ' ' + this._textFont["family"];

			if (e.type === "DOM") {
				var el = this._element,
					style = el.style;

				style.color = this._textColor;
				style.font = font;
				el.innerHTML = this._text;
			} else if (e.type === "canvas") {
				var context = e.ctx,
					metrics = null;

				context.save();

				context.fillStyle = this._textColor || "rgb(0,0,0)";
				context.font = font;

				context.translate(this.x, this.y + this.h);
				context.fillText(this._text, 0, 0);

				metrics = context.measureText(this._text);
				this._w = metrics.width;

				context.restore();
			}
		}