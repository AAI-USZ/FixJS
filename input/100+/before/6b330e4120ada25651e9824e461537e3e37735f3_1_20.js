function (s) {
		var s = s || '-';

		for (var button in this._powerButtons)
			this._powerButtons[button].disabled = true;

		for (var button in this._playlistButtons)
			this._playlistButtons[button].disabled = true;

		if (this._nextButton)
			this._nextButton.disabled = true;

		console.info('Remote disabled (' + s + ').');
	}