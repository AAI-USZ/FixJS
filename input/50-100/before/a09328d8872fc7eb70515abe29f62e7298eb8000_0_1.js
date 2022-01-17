function(volume) {
        volume += self.getVolume();
        if (volume <= 0) {
            self.setVolume(0);
        } else if (volume >= 100) {
            self.setVolume(100);
        } else {
            self.setVolume(volume);
        }
    }