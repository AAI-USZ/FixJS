function foldr1(f) {
      return function(xs) {
	if (xs[0] === "Nil") { throw "'foldr1' requires an non-empty list." }
	if (xs[0] !== "Cons") { throwError('foldr1'); }
	var arr = [];
	while (xs[0] === "Cons") {
	    arr.push(xs[1]);
	    xs = xs[2];
	}
        var acc = arr.pop();
	for (var i = arr.length; i--; ) {
	    acc = f(arr[i])(acc);
	}
	return acc;
      }
    }