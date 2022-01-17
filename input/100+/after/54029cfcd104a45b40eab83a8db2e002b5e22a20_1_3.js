function() {
            var rulesets = {};
            this.rulesets().map(function(r){
                rulesets[r.name()] = r.sets();
            });

            var variables = {};
            this.variables().map(function(v) {
                variables[v.name()] = v.definition();
            });

			var functions = {};
			this.functions().map(function(f) {
				functions[f.name()] = f.toJSON();
			});

			var extensions = [];
			this.extensions().map(function(e) {
				if(e.used())
					extensions.push(e.location);
			});

            return {
                name: this.realName(),
                tags: this.tags(),
                statement: this.statement(),
				extensions: extensions,
                advice: this.advice(),
                rulesets: rulesets,
                variables: variables,
				functions: functions,
                parts: this.parts().map(function(p){return p.toJSON();})

                }
        }