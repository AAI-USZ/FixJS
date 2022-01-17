function() {
            this.halt();
            this.set("animation", "attack");
            Tilekit.emit("damage", this.getPositionFront(), this);
        }