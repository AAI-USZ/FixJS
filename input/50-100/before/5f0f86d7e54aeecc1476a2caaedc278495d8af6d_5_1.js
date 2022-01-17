function(tileCanvas, effectCanvas) {
            this.tileContext = tileCanvas.getContext('2d');
            this.effectContext = effectCanvas.getContext('2d');

            this.emptyTile = new Image();
            this.emptyTile.src = '/img/' + Globals.theme + '/empty.png';

            return this;
        }