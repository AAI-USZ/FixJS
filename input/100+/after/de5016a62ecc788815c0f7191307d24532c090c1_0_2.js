function(status) {
        if (status != this._status) {
            this._status = status;
            if (this._status == "Playing") {
                this._playButton.setIcon("media-playback-pause");
                this._startTimer();
            }
            else if (this._status == "Paused") {
                this._playButton.setIcon("media-playback-start");
                this._pauseTimer();
            }
            else if (this._status == "Stopped") {
                this._playButton.setIcon("media-playback-start");
                this._stopTimer();
            }
            // Wait a little before changing the state
            // Some players are sending the stopped signal
            // when changing tracks
            Mainloop.timeout_add(1000, Lang.bind(this, this._refreshStatus));
        }
    }