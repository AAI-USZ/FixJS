function advise(instance, name, advice){
		var f = instance[name], a;
		if(f && f.adviceNode && f.adviceNode instanceof Node){
			a = f.adviceNode;
		}else{
			a = new Node(instance, name);
			if(f && f.advices){
				f = f.advices;
				a.a(f.b, f.a, f.f);
			}else{
				a.a(0, 0, f);
			}
			instance[name] = makeAOPStub(a);
		}
		if(typeof advice == "function"){ advice = advice(name, instance); }
		return a.a(advice.before, advice.after, 0, advice.around);
	}