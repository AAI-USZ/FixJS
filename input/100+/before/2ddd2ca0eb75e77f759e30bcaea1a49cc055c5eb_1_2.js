function(gen, newGen) {
			Gibberish.disconnect(gen); // disconnect from output if connected
		
			// if gen is modulating another gen...
			for(var i = 0; i < gen.modding.length; i++) {
				var mod = gen.modding[i];
				mod.ugen.removeMod(mod.mod);
				mod.ugen.mod(mod.mod.name, newGen, mod.mod.type);
			}
		
			// if gen is being modulated...
			for(var i = 0; i < gen.mods.length; i++) {
				var mod = gen.mods[i];
				newGen.mod(mod.name, mod.operands[1], mod.type);
			}
		
			// if gen is slaved to sequencer...
			if(typeof gen.masters !== "undefined") {
				for(var i = 0; i < gen.masters.length; i++) {
					var master = gen.masters[i];
					master.slaves.remove(gen);
					master.slave(newGen);
				}
			}
		
			// if gen has fx...
			for(var i = 0; i < gen.fx.length; i++) {
				console.log("ADDING");
				newGen.fx.add(gen.fx[i]);
			}
		}