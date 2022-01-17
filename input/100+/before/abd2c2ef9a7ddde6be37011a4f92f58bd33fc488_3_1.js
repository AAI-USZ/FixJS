function mouseEmit(e) {
                
                var size   = self.get("size"),
                    center = self.findCenter();
                
                e.tile = self.getTileAt(e.offsetX, e.offsetY);
                e.position = {
                    x: (e.offsetX * size) + center.x,
                    y: (e.offsetY * size) + center.y
                };

                self.set("mouse", e);
                self.emit(e.type, e);
                
            }