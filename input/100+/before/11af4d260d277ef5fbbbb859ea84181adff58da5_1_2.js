function() {
			return { tag: "DIV", id: this.id(), cls: "queryFilter", children: [
				this._aliasSelector_template(),
				this._indexSelector_template(),
				this._typesSelector_template(),
				this._filters_template()
			] };
		}