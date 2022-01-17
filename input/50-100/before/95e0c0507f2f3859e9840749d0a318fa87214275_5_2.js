function() {

            var size = this.grid.get("size"),
                range = Math.roundTo(this.get("vision") / size, size);

            this.halt();

            this.set("animation", "attack");

            Tilekit.Projectile({

                source: this,

                from: this.get("position"),

                distance: this.get("vision") * 2,
                angle: this.get("face"),
                scene: this.scene
            });

        }