function run_dnscheck() {
	interval = setInterval(pollResult, retry_interval);

	load();
	// Telling form to not submit?
	return false;
}