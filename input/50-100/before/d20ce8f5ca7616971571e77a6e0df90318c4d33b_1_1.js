function (ev) {
	console.log(util.inspect(ev, null, true));
	console.log('contract ' + ev.ctid + ' has emptied');
	console.log(util.inspect(ct.status(), null, true));

	ct.abandon();
	ct.removeAllListeners();
	ct = null;
}