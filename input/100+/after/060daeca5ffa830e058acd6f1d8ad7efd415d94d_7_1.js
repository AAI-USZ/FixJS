function(Tilekit) {

    var round = Math.round;

    var Tile = window.klass({

        x: 0, y: 0,
        width: 32, height: 32,
        layers: [],

        initialize: function(options) {
            Tilekit.extend(this, options);
        },

        isTraversable: function() {

            if (this.__blockOnce) {
                this.__blockOnce = undefined;
                return false;
            }

            return this.layers[1] === undefined || this.layers[1] === 0;

        },

        isBlocking: function() {
            return this.layers[1] > 0;
        },

        roundedTile: function() {
            return {
                x : round(this.x),
                y : round(this.y)
            };
        }

    });

    Tilekit.Tile = Tile;

}