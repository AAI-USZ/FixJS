function kOnData(data, text)
{
	var message, key, nreading;

	if (!data) {
		message = 'invalid data';
		if (text)
			message += ': ' + text;
		alert(message);
		return;
	}

	for (key in kVideos)
		kVideos[key].deleteMark = true;

	nreading = 0;
	data.forEach(function (video) {
		kVideos[video.id] = video;

		if (video.state == 'reading')
			nreading++;

		if (video.state != 'done')
			return;

		/* Update the set of players for autocomplete. */
		video.metadata.races.forEach(function (race) {
			race.people.forEach(function (p) {
				kPlayersAutocomplete[p] = true;
			});
		});
	});

	for (key in kVideos) {
		if (!kVideos[key].deleteMark)
			continue;

		delete (kVideos[key]);
	}

	if (kForceRefresh || kScreenName == 'summary') {
		kDomUpdated.text(new Date());
		kScreenUpdate();
	}

	kForceRefresh = false;

	if (nreading > 0)
		setTimeout(kLoadData, 1000);
}