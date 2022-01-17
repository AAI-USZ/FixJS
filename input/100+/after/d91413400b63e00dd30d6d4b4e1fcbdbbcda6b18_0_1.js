functions().map(function(f) {

				var name = f.name();

				var intype = [],
					paramNames = [];

				f.parameters().map(function(p) {
					intype.push(jme.types[p.type()]);
					paramNames.push(p.name());
				});

				var outcons = jme.types[f.type()];

				var fn = new jme.funcObj(name,intype,outcons,null,{nobuiltin: true});

				switch(f.language())
				{
				case 'jme':
					fn.tree = jme.compile(f.definition(),scope,true);

					fn.evaluate = function(args,scope)
					{
						scope = new Numbas.jme.Scope(scope);

						for(var j=0;j<args.length;j++)
						{
							scope.variables[paramNames[j]] = jme.evaluate(args[j],scope);
						}
						return jme.evaluate(this.tree,scope);
					}
					break;
				case 'javascript':
					var preamble='(function('+paramNames.join(',')+'){';
					var math = Numbas.math, 
						util = Numbas.util;
					var jfn = eval(preamble+f.definition()+'})');
					fn.evaluate = function(args,scope)
					{
						args = args.map(function(a){return jme.evaluate(a,scope).value});
						try {
							var val = jfn.apply(this,args);
							if(!val.type)
								val = new outcons(val);
							return val;
						}
						catch(e)
						{
							throw(new Numbas.Error('jme.user javascript error',f.name(),e.message));
						}
					}
					break;
				}

				if(scope.functions[name]===undefined)
					scope.functions[name] = [];
				scope.functions[name].push(fn);
			}