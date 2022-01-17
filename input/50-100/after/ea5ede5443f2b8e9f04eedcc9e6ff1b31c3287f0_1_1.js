function at_next_curfew_start(board, func) {
	var when = caps.curfew_starting_time(board);
	winston.info('Next curfew for ' + board + ' at ' + when.toUTCString());
	setTimeout(func, when.getTime() - new Date().getTime());
}