function run_dnscheck() {
	interval = setInterval(pollResult, 2000);

	load();
	// Telling form to not submit?
	return false;
}