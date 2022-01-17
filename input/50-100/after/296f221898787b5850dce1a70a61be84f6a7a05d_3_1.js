function(x, y, speed, angle, image, timeout) {
                if (!that.enemy.alive) {
                    return;
                }
                setTimeout(function() {
                    that.add(new Bullet({
                        x: x, y: y, speed: speed, 
                        angle: angle + 180, image: image,
                        owner: that.enemy, life: 10000
                    }));
                }, timeout);
            }