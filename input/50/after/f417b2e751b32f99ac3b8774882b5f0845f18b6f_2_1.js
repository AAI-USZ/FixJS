function createSection() {
		return { id: 'anon' + (nextAnonId++),
			     src: [], // source as lines
			     desc: '',
			     requires: {}, // contains ids->1
			     requiredBy: {}, // contains ids->1
			     syntax: [],
			     params: [] // contains {name, desc, funcs} each; @return has '@return' as name
			   };
	}