function(inPragmas) {
		var groups = {protected: 1, public: 1};
		for (var i=0, p; p=inPragmas[i]; i++) {
			if (groups[p]) {
				//console.log(p);
				this.group = p;
			}
		}
	}