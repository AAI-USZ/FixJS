function layer(ctx) {

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

        }