function(resolved, rejected) {
			this.thens.push([resolved, rejected]);
			return this;
		}