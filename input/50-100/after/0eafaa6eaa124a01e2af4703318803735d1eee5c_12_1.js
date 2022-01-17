function () {
	G = F.bind(o, o, "Function.prototype.bind(): wrong this");
	G();
	var F = function () { return this; }, G = F.bind({ hello: "world" });
	assert((new G).hello === undefined, "Function.prototype.bind(): should not be bound when called as constructor");
}