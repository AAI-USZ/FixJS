function (x) {
	if (x instanceof Expression.List.ComplexCartesian) {
		// (a+bi) * (c+di) = ac + adi + bci - bd
		return new Expression.List.ComplexCartesian([
			this[0]['*'](x[0])['-'](this[1]['*'](x[1])),
			this[0]['*'](x[1])['+'](this[1]['*'](x[0]))
		]);
	}
	if (x instanceof Expression.List.Real || x instanceof Expression.Symbol.Real || x instanceof Expression.NumericalReal) {
		return new Expression.List.ComplexCartesian([
			this[0]['*'](x),
			this[1]['*'](x)
		]);
	}
}