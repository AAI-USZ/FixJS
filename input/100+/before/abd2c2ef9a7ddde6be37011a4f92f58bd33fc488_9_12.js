function(options) {

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

    }