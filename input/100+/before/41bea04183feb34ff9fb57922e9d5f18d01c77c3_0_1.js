function(opcode, value) {
		var condition = mc.registers.getRegister("CC");
		if (opcode.conditions == undefined || value == undefined)
			return;
		
		var codes = ["C", "V", "Z", "N", "I", "H", "X", "S"];
		var byte_size = 0x100; //mc.memory.size;
		
		var final = ((value%byte_size)+byte_size)%byte_size; // The actual value stored
		
		for (var c in codes) {
			var code = codes[c];
			var bit = null;
			
			
			if (opcode.conditions[code] == null) {
				switch(code) {
					case "C":
						bit = (value >= byte_size);
						break;
					case "V":
						bit = (value >= (byte_size>>1) || value <= -(byte_size>>1));
						break;
					case "Z":
						bit = (final == 0);
						break;
					case "N":
						bit = (final&(byte_size>>1) > 0);
						break;
					case "I":
						break;
					case "H":
						break;
					case "S":
						break;
					case "X":
						break;
				}
			} else if (opcode.conditions[code] != null) {
				bit = opcode.conditions[code];
			}
			if (bit != undefined) {
				if (bit)
					condition.value.bitSet(c);
				else
					condition.value.bitUnset(c);
			}
		}
	}