function(dcl, advise){
	function DclError(message){
		if(Error.captureStackTrace){
			Error.captureStackTrace(this, ErrorCtor);
		}
		var e = Error.call(this, message), name;
		for(name in e){
			if(e.hasOwnProperty(name)){
				this[name] = e[name];
			}
		}
		this.message = message;
	}
	DclError.prototype = dcl.delegate(Error.prototype);
	DclError.prototype.constructor = DclError;

	var DclCycleError = dcl(DclError, {declaredClass: "dcl/debug/DclCycleError"}),
		DclChainingError = dcl(DclError, {declaredClass: "dcl/debug/DclChainingError"}),
		DclSetChainingError = dcl(DclError, {declaredClass: "dcl/debug/DclSetChainingError"});

	var chainNames = ["UNCHAINED BUT CONTAINS ADVICE(S)", "CHAINED BEFORE", "CHAINED AFTER"];
	function chainName(id){
		return id >= 0 && id <= 2 ? chainNames[id] : "UNKNOWN";
	}

	var noDecls = "(specify 'declaredClass' string in your classes to get better diagnostics)";
	advise.around(dcl, "_er", function(/*sup*/){
		return function(reason, a1, a2, a3, a4, a5){
			var cName, someUnknown, i, base, name, names = [], c = {};
			switch(reason){
				case "cycle":
					cName = a1.hasOwnProperty("declaredClass") && a1.declaredClass;
					someUnknown = !cName;
					for(i = a2.length - 1; i >= 0; --i){
						base = a2[i][0];
						name = base.prototype.hasOwnProperty("declaredClass") && base.prototype.declaredClass;
						if(!name){
							name = "UNNAMED_" + base._u;
							someUnknown = true;
						}
						if(!c[name]){
							names.push(name);
							c[name] = 1;
						}
					}
					throw new DclCycleError("dcl: base class cycle found" + (cName ? " in " + cName : "") +
						" - bases: " + names.join(", ") + " are mutually dependent" +
						(someUnknown ? noDecls : ""));
				case "chain":
					cName = a2.prototype.hasOwnProperty("declaredClass") && a2.prototype.declaredClass;
					name = a4.prototype.hasOwnProperty("declaredClass") && a4.prototype.declaredClass;
					someUnknown = !(cName && name);
					throw new DclChainingError("dcl: conflicting chain directives found" + (cName ? " in " + cName: "") +
						" for method " + a1 + " - it is presumed to be " + chainName(a3) + " yet class " +
						(name || ("UNNAMED_" + a4._u)) + "assumes it to be " + chainName(a5) +
						(someUnknown ? noDecls : ""));
				case "set chaining":
					cName = a2.prototype.hasOwnProperty("declaredClass") && a2.prototype.declaredClass;
					someUnknown = !cName;
					throw new DclSetChainingError("dcl: attempt to set conflicting chain directive" + (cName ? " in " + cName: "") +
						" for method " + a1 + " - it is " + chainName(a3) + " now yet being changed to " + chainName(a4) +
						(someUnknown ? noDecls : ""));
			}
			throw new DclError("dcl: " + reason);
		};
	});

	advise.after(dcl, "_p", function(args, ctor){
		// validate that chaining is consistent
		var meta = ctor._m, weaver = meta.w, bases = meta.b,
			name, chain, base, i, c;
		for(name in weaver){
			chain = (+weaver[name] || 0);
			for(i = bases.length - 1; i >= 0; --i){
				base = bases[i];
				meta = base._m;
				if(meta){
					c = (+meta.w[name] || 0);
					if(chain != c && (!chain || c)){
						dcl._er("chain", name, ctor, chain, base, c);
					}
				}
			}
		}
	});

	function log(ctor){
		var meta = ctor._m;
		if(!meta){
			console.log("*** class does not have meta information compatible with dcl");
			return;
		}
		var weaver = meta.w, bases = meta.b, names = [], base, name, someUnknown, i;
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
		for(name in weaver){
			i = +weaver[name];
			if(!isNaN(i)){
				console.log("    method " + name + " is " + chainName(i));
			}
		}
		if(someUnknown){
			console.log("    " + noDecls);
		}
	}

	return {
		log: log,
		DclError: DclError,
		DclCycleError: DclCycleError,
		DclChainingError: DclChainingError,
		DclSetChainingError: DclSetChainingError
	};
}