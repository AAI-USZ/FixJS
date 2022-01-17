function() {
                    that.add(new Bullet({
                        x: x, y: y, speed: speed, 
                        angle: angle + 180, image: image,
                        owner: that.enemy, life: 10000
                    }));
                }