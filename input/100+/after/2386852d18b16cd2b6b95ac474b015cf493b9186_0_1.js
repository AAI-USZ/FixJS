function XYZ(X, Y, Z) {
		if (Type.isNumber(X) && Type.isNumber(Y) && Type.isNumber(Z)) {
			this.X = X;
			this.Y = Y;
			this.Z = Z;
		} else if (Type.isObject(X)) {
			if (X instanceof this.constructor) {
				this.X = X.X;
				this.Y = X.Y;
				this.Z = X.Z;
			} else {
				return toXYZ(X);
			}
		} else {
			return toXYZ(X);
		}
	}