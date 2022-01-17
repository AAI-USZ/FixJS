function() {
	var hash = window.location.hash;
	hash = hash.substr(1, hash.length-1);
	console.info("hash", hash);
	if (!hash) { return false; }

	var actionIndex = hash.indexOf(" ");
	if (actionIndex == -1) { actionIndex = hash.length; }

	var action = hash.substr(0, actionIndex);
	var params = hash.substr(actionIndex + 1, hash.length - 1);

	this.runAction(action, params, true);

}