function update() {
                var now = +(new Date),
                    elapsed = now - current,
                    elapsed_total = now - start,
                    tfactor = Math.min(1, elapsed_total / animation.time),
                    factor = animation.transition(tfactor),
                    i,
                    max;

                current = now;

                max = animation.properties.length;
                for(i = 0; i < max; ++i) {
                    this[animation.properties[i]] = animation.getValue(factor, animation.properties[i]);
                    console.log("update", animation.properties[i], ":", factor, "=", this[animation.properties[i]]);
                }


                if (tfactor === 1) {
                    clearInterval(update_interval);
                    //animation end!
                    this.emit("animation:end", [animation]);
                } else {
                    this.emit("animation:update", [animation]);
                }
            }