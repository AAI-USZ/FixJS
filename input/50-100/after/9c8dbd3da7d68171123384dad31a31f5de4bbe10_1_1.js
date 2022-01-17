function (ev) {
	console.log(util.inspect(ev, null, true));
	console.log('contract ' + ev.nce_ctid + ' empty');
	ct.abandon();
	ct.removeAllListeners();
	ct = null;
}