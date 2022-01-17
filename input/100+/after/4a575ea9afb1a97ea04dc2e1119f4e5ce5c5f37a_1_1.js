function(/*sup*/){
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
				case "wrong super call":
					cName = a1.prototype.hasOwnProperty("declaredClass") && a1.prototype.declaredClass;
					someUnknown = !cName;
					throw new DclSuperCallError("dcl: wrong argument of an around advice or supercall" +
						(cName ? " in " + cName: "") + " for method " + a2 + (someUnknown ? noDecls : ""));
				case "wrong super":
					cName = a1.prototype.hasOwnProperty("declaredClass") && a1.prototype.declaredClass;
					someUnknown = !cName;
					throw new DclSuperError("dcl: super method should be a function" +
						(cName ? " in " + cName: "") + " for method " + a2 + (someUnknown ? noDecls : ""));
				case "wrong super result":
					cName = a1.prototype.hasOwnProperty("declaredClass") && a1.prototype.declaredClass;
					someUnknown = !cName;
					throw new DclSuperResultError("dcl: around advice or supercall should return a function" +
						(cName ? " in " + cName: "") + " for method " + a2 + (someUnknown ? noDecls : ""));
			}
			throw new DclError("dcl: " + reason);
		};
	}