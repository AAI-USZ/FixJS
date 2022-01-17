function logCtor(ctor){
		var meta = ctor._m;
		if(!meta){
			console.log("*** class does not have meta information compatible with dcl");
			return;
		}
		var weaver = meta.w, bases = meta.b, chains = meta.c, names = [], base, name, someUnknown, i;
		for(i = 0; i < bases.length; ++i){
			base = bases[i];
			name = base.prototype.hasOwnProperty("declaredClass") && base.prototype.declaredClass;
			if(!name){
				name = "UNNAMED_" + (base.hasOwnProperty("_u") ? base._u : "");
				someUnknown = true;
			}
			names.push(name);
		}
		console.log("*** class " + names[0] + " depends on " + (names.length - 1) + " classes");
		if(names.length > 1){
			console.log("    dependencies: " + names.slice(1).join(", "));
		}
		if(someUnknown){
			console.log("    " + noDecls);
		}
		for(name in weaver){
			i = +weaver[name];
			if(!isNaN(i)){
				var hasStub = typeof ctor.prototype[name].advices == "object";
				if(hasStub){
					var b = dcl._ec(bases, name, "b").length,
						f = dcl._ec(bases, name, "f").length,
						a = dcl._ec(bases, name, "a").length;
				}
				console.log("    class method " + name + " is " + chainName(i) + " (length: " + chains[name].length + ")" +
					(hasStub ? ", and has an AOP stub (before: " + b + ", around: " + f + ", after: " + a + ")": ""));
			}
		}
	}