function subtract (param, cb, global) {
	var i = param; 	//matches k from testcase1 (=3)
	var j = i-1;
	//console.log('test2: j=' + j);	//j=2
	cb(null, j); //set k as output value
}