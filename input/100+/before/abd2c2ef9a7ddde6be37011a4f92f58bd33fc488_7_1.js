function(Tilekit) {
    
    var Character = Tilekit.Character,
        TextBox = window.Textbox;
    
    var Scene = Tilekit.Scene = window.klass(function(options) {

        options = options || {};
        
        Tilekit.extend(this, {
            units: []
        }, options);

        if (this.units.length) {
            this.add(this.units);
        }

    });

    // Add a player to the map
    Scene.prototype.add = function(options) {

        var slot = 0, c;
        
        // Handle multiple entries
        // -------------------------------------------------- //

        if (options.isArray) {

            while (options[slot]) {

                c = options[slot];
                
                c.tile = c.tile || {
                    x: c.x || 0, 
                    y: c.y || 0
                };

                this.add(c);
                slot++;
            }

            return;
        }

        if (options instanceof Tilekit.Unit) {
            c = this.units[options.get("name")] = options;
            return c;
        }

        // Handle single entries
        // -------------------------------------------------- //
        
        options = Tilekit.extend({}, {
            image: Tilekit.defaults.character_sprite,
            tile: {
                x: options.x || 0,
                y: options.y || 0
            }
        }, options);
        
        c = this.units[options.name] = new Character(options.name, this, options);

        return c;

    };

    // Remove players from map
    Scene.prototype.remove = function(name) {

        if (name instanceof Tilekit.Unit) {
            name = name.get("name");
        }

        if (!this.units[name]) {
            return;
        }

        this.units[name].remove();

        delete this.units[name];
    };

    // Messaging
    // -------------------------------------------------- //

    Scene.prototype.message = function(header, message, callback) {
        
        var grid = this.grid,
            uuid = Date.now();

        callback = callback || function(){};
        
        // Okay, now generate the new message
        this.grid.addLayer("message-" + uuid, function(ctx, date) {
            
            var text = new TextBox({
                header: header,
                subheader: new Array(header.length + 3).join("-"),
                body: message,
                context: grid.c
            });

            text.draw.apply(text);
        });

        $(window).one("keydown", function remove(e) {
            grid.removeLayer("message-" + uuid);
            callback(e);
            return false;
        });        

    };


    // Querying
    // -------------------------------------------------- //

    Scene.prototype.find = function(condition) {
        
        for (var u in this.units) {
            if (this.units.hasOwnProperty(u) && condition(this.units[u])) { 
                return this.units[u];
            }
        }

        return false;

    };

    // Find a character at a specific tile
    Scene.prototype.findAt = function(tile, callback) {

        var tile2;

        for (var c in this.units) {
            
            if (this.units.hasOwnProperty(c) ) {
                
                tile2 = this.units[c].tile();

                if (tile.x === tile2.x && tile.y === tile2.y) {
                    
                    if (callback) {
                        callback(this.units[c]);
                    } else {
                        return this.units[c];
                    }
                }

            }

        }

    };


    // JSON Operations
    // -------------------------------------------------- //

    // GET
    Scene.prototype.fetch = function(url, callback) {
        
        $.get(url, function(data) {
            callback(data);
        });

        return {
            then: function(fn) {
                callback = fn;
            }
        };

    };

}