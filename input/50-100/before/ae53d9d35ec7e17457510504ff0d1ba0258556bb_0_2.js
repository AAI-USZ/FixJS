function () {
			delete this.$;
			can.Control.prototype.destroy.call(this);
		}