function (e, r, c) {
	e.__proto__ = Expression.Matrix.prototype;
	e.rows = r;
	e.cols = c;
	return e;
}