function(position) {

            var size   = this.get('size'),
                center = this.findCenter(),

                x = position.x + center.x,
                y = position.y + center.y;

            x = floorTo(position.x / size, size);
            y = floorTo(position.y / size, size);

            return {
                x: x,
                y: y
            };
        }