function(mc, memory) {
			var a = mc.registers.getRegister("A");
			var b = mc.registers.getRegister("B");
			var d = (a.value << 8) + b.value;
			var s = (memory[0].value << 8) + memory[1].value;
			d += s;
			d = d.byteWrap(16);
			a.value = (d >> 8) & 0x00FF;
			b.value = d & 0x00FF;
		}