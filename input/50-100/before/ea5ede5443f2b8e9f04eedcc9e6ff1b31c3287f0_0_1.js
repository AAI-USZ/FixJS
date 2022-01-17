function day_after(today) {
	/* Leap shenanigans? This is probably broken somehow. Yay dates. */
	var tomorrow = new Date(today.getTime() + 24*3600*1000);
	if (tomorrow.getUTCDate() == today.getUTCDate())
		tomorrow = new Date(tomorrow.getTime() + 12*3600*1000);
	return tomorrow;
}