function (v) {
			if (this.desktop) {
				if (this._mold == "os") {
					var n = this.$n(),
						zclass = this.getZclass();
					if (zclass)
						jq(n)[(n.disabled = v) ? "addClass": "removeClass"](zclass + "-disd");
				} else
					this.rerender(); //bind and unbind required (because of many CSS classes to update)
			}
		}