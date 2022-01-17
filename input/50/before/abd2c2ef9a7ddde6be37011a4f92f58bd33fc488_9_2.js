function() {
            this.halt();
            this.set("animation", "attack");
            this.emit("attack", this.getTileFront());
        }