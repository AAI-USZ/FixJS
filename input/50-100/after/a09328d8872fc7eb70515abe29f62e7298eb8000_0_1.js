function(volume) {
        volume += self.getVolume();
        if (volume <= 0) {
            self.setVolume(0);
            Volume.updateUI(0);
        } else if (volume >= 100) {
            self.setVolume(100);
            Volume.updateUI(100);
        } else {
            self.setVolume(volume);
            Volume.updateUI(volume);
        }
    }