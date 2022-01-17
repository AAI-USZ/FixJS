function () {
			var script = this.script();
			if (!script) return undefined;
			return script.url.replace(/^.*\//, '') + ":" + (this.location.lineNumber + 1);
		}