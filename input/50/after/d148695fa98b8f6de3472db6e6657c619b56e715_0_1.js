function() {
            self.tilesPerRow = Frog.Prefs.tileCount;
            self.tileSize = Math.floor((window.getWidth() - 2) / self.tilesPerRow);
            self.request();
        }