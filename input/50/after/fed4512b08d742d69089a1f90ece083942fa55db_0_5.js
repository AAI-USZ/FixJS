function (e) {
	e.__proto__ = Expression.Vector.prototype;
	return e;
}