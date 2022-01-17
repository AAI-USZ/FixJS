function (ev) {
	console.log(util.inspect(ev, null, true));
	console.log('contract ' + ev.ctid + ' has emptied');
	ct.ack(ev.evid);
	console.log(util.inspect(ct.status(), null, true));

	ct.abandon();
	ct.removeAllListeners();
	ct = null;
}