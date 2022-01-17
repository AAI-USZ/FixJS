function (name, newValue) {
			if (name == "visible") {
				this.visible = newValue;

				var visible = this.images[this.visible];

				this._domElt.src = this.ROOT + visible.url;
				this._domDesc.innerHTML = visible.desc;
			}
		}