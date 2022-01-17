function onmessage(evt) {

		if (!inLocationList(evt.origin)) { return; }

		var nString = evt.data,
			ar = nString.split('::'),
			nObj = {};

		nObj.d = ar[3]; nObj.m = ar[2];
		nObj.f = ar[1]; nObj.p = ar[0];

		nObj.m = new Function('return ' + nObj.m)();

		var root = window,
			context = null,
			li = nObj.f.split('.');

		while (li.length) {
			context = root;
			root = context[li.shift()];
		}

		if (typeof root === 'function') {
			root.call(context, nObj.m);
		}
	}