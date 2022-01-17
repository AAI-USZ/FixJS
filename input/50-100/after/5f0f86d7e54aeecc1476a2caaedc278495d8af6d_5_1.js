function(gameboard) {
            this.gameboard = gameboard;
            this.tileContext = gameboard.tileLayer.getContext('2d');
            this.effectContext = gameboard.effectLayer.getContext('2d');

            this.emptyTile = new Image();
            this.emptyTile.src = '/img/' + Globals.theme + '/empty.png';

            return this;
        }