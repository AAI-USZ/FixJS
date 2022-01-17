function() {
	client.connect();
	registerIssuesHook('Tehtsuo', 'Combot');
	registerIssuesHook('VendanAndrews', 'CombotPatcher');
	registerIssuesHook('VendanAndrews', 'GithubPatcher');
	registerIssuesHook('VendanAndrews', 'CombotIRCBot');
}