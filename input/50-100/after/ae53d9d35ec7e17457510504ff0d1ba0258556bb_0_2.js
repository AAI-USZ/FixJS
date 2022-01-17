function () {
			var controls = can.data(this.element,"controls");
			controls.splice(can.inArray(this, controls),1);
			delete this.$;
			can.Control.prototype.destroy.call(this);
		}