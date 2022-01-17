function mouseEmit(e) {

                var size   = self.get("size"),
                    center = self.findCenter();

                e.position = {
                    x: ( (e.clientX / self.scale) - center.x - size / 2),
                    y: ( (e.clientY / self.scale) - center.y - size / 2)
                };
                
                e.tile = {
                    x: roundTo(e.position.x / size, 1),
                    y: roundTo(e.position.y / size, 1)
                };

                self.set("mouse", e);
                self.emit(e.type, e);
                
            }