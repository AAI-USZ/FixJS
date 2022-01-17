function() { 
		//expect(1);
		
		var program = [
			Utils.makeInstruction(OPERATION_SET, Literals.L_5, Values.SP_OFFSET),		// push 5
			Utils.makeInstruction(OPERATION_SET, Literals.L_4, Values.SP_OFFSET),		// push 4
			Utils.makeInstruction(OPERATION_SET, Literals.L_3, Values.SP_OFFSET),		// push 3
			Utils.makeInstruction(OPERATION_SET, Literals.L_2, Values.SP_OFFSET),		// push 2
			Utils.makeInstruction(OPERATION_SET, Literals.L_1, Values.SP_OFFSET),		// push 1
			Utils.makeInstruction(OPERATION_SET, Literals.L_0, Values.SP_OFFSET),		// push 0
			Utils.makeInstruction(OPERATION_SET, Literals["L_-1"], Values.SP_OFFSET),	// push -1
			
			Utils.makeInstruction(OPERATION_SET, Values.SP_OFFSET, REGISTER_A),		// pop -1
			Utils.makeInstruction(OPERATION_SET, Values.SP_OFFSET+1, REGISTER_B),		// peak 0
			Utils.makeInstruction(OPERATION_SET, Values.SP_OFFSET+2, REGISTER_C),	0x3,// pick 3
			Utils.makeInstruction(OPERATION_SET, Values.SP_OFFSET, REGISTER_I),		// pop 0
			Utils.makeInstruction(OPERATION_SET, Values.SP_OFFSET, REGISTER_J),		// pop 1
		];
		
		var e = new Emulator();
		e.async = false;
		e.run(program);
		
		equal(Utils.to32BitSigned(e.Registers.A.get()), -1, "Register A is -1");
		equal(e.Registers.B.get(), 0, "Register B is 0");
		equal(e.Registers.C.get(), 3, "Register C is 3");
		equal(e.Registers.I.get(), 0, "Register I is 0");
		equal(e.Registers.J.get(), 1, "Register J is 1");
		equal(e.Registers.SP.get(), 0xfffc, "Register SP is 0xfffc");
	}