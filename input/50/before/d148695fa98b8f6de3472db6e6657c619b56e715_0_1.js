function() {
            self.tilesPerRow = Frog.Prefs.tile_count;
            self.tileSize = Math.floor((window.getWidth() - 2) / self.tilesPerRow);
            self.request();
        }