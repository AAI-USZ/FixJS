function CIELab(L, a, b) {
		if (Type.isNumber(L) && Type.isNumber(a) && Type.isNumber(b)) {
			this.L = L;
			this.a = a;
			this.b = b;
		} else if (Type.isObject(L)) {
			if (L instanceof this.constructor) {
				this.L = L.L;
				this.a = L.a;
				this.b = L.b;
			} else {
				return toCIELab(L);
			}
		}
	}