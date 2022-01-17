function soundManager_observe(value) {
        self.currentVolume = value * 100;
        self.level = Math.sqrt(self.currentVolume);
    }