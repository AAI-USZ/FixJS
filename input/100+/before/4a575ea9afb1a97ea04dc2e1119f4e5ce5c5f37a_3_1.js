function dcl(superClass, props){
		var bases = [0], proto, base, ctor, m, o, r, b, i, j = 0, n;

		if(superClass){
			if(superClass instanceof Array){
				// mixins: C3 MRO
				m = {}; b = superClass.slice(0).reverse();
				for(i = b.length - 1; i >= 0; --i){
					base = b[i];
					// pre-process a base
					// 1) add a unique id
					base._u = base._u || counter++;
					// 2) build a connection map and the base list
					if((proto = base._m)){   // intentional assignment
						for(r = proto.b, j = r.length - 1; j > 0; --j){
							n = r[j]._u;
							m[n] = (m[n] || 0) + 1;
						}
						b[i] = r.slice(0);
					}else{
						b[i] = [base];
					}
				}
				// build output
				o = {};
				c: while(b.length){
					for(i = 0; i < b.length; ++i){
						r = b[i];
						base = r[0];
						n = base._u;
						if(!m[n]){
							if(!o[n]){
								bases.push(base);
								o[n] = 1;
							}
							r.shift();
							if(r.length){
								--m[r[0]._u];
							}else{
								b.splice(i, 1);
							}
							continue c;
						}
					}
					// error
					dcl._er("cycle", props, b);
				}
				// calculate a base class
				superClass = superClass[0];
				j = bases.length - ((m = superClass._m) && superClass === bases[bases.length - (j = m.b.length)] ? j : 1) - 1; // intentional assignments
			}else{
				// single inheritance
				bases = bases.concat((m = superClass._m) ? m.b : superClass);   // intentional assignment
			}
		}
		// create a base class
		proto = superClass ? dcl.delegate(superClass[pname]) : {};
		// the next line assumes that constructor is actually named "constructor", should be changed if desired
		r = superClass && (m = superClass._m) ? dcl.delegate(m.w) : {constructor: 2};   // intentional assignment

		// create prototype: mix in mixins and props
		for(; j > 0; --j){
			base = bases[j];
			m = base._m;
			mix(proto, m && m.h || base[pname]);
			if(m){
				for(n in (b = m.w)){    // intentional assignment
					r[n] = (+r[n] || 0) | b[n];
				}
			}
		}
		for(n in props){
			if(isSuper(m = props[n])){  // intentional assignment
				r[n] = +r[n] || 0;
			}else{
				proto[n] = m;
			}
		}

		// create stubs
		o = {b: bases, h: props, w: r, c: {}};
		bases[0] = {_m: o}; // fake constructor (only meta is available)
		buildStubs(o, proto);
		ctor = proto[cname];

		// put in place all decorations and return a constructor
		ctor._m  = o;
		ctor[pname] = proto;
		//proto.constructor = ctor; // uncomment if constructor is not named "constructor"
		bases[0] = ctor;

		return dcl._p(ctor);    // fully prepared constructor
	}