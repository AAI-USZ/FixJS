function(data) {
            tryLoad(data,['name','statement','advice'],this);

			if('extensions' in data) {
				this.extensions().map(function(e) {
					if(data.extensions.indexOf(e.location)>=0)
						e.used(true);
				});
			}
            
            if('variables' in data)
            {
                for(var x in data.variables)
                {
                    this.variables.push(new Variable(this,{name:x,definition:data.variables[x]}));
                }
            }

			if('functions' in data)
			{
				for(var x in data.functions)
				{
					data.functions[x].name = x;
					this.functions.push(new CustomFunction(this,data.functions[x]));
				}
			}

            if('rulesets' in data)
            {
                for(var x in data.rulesets)
                {
                    this.rulesets.push(new Ruleset(this,{name: x, sets:data.rulesets[x]}));
                }
            }

            if('parts' in data)
            {
                data.parts.map(function(vd) {
                    this.parts.push(new Part(this,null,null,vd));
                },this);
            }
        }