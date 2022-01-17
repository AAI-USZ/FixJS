function skipToLinkedTime(e) {
		console.log('skipToLinkedTime');
		if (deepLink !== false && playerCount === 1) {
			e.data.player.setCurrentTime(deepLink[0]);
			deepLink = false;
		}
	}