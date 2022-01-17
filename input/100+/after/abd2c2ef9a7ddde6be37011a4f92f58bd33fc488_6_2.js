function(TK) {
    
    var findPoint = window.Geo.findPoint;
    
    var Projectile = TK.Projectile = function(options) {
        
        var settings = TK.extend({
            
            damage: 0,
            
            source: null,

            distance: 300,
            speed: 10,
            angle: 0,

            scene: null

        }, options);
        
        var scene  = settings.scene,
            grid   = settings.scene.grid,
            travel = 0,
            offset = grid.get("size") / 2,
            name   = "projectile" + Date.now(),
            from   = settings.source.get("position");

        grid.addLayer(name, function layer(ctx) {

            var center = grid.findCenter();

            travel += settings.speed;
            
            var target = findPoint(settings.from, travel, -settings.angle);

            TK.emit("damage", target, settings.source);

            TK.Rectangle(ctx, target.x + center.x + offset, target.y + center.y, 5, 5, {
                fill: "#000"
            });
            
            if (travel > settings.distance) {
                grid.removeLayer(name);
            }

        });

    };
        
    }