function () {
        // Set the inventory's visibility based on whether we're in Weltmeister and the
        // player is trying to access the inventory
        if (!ig.global.wm) {
            this.inventory.isVisible = ig.gui.show = this.state === this.states.IN_INVENTORY;
        }

        if (ig.input.pressed('confirm')) {
            var player = ig.game.getEntitiesByType(EntityPlayer)[0];

            this.dialogVisible = this.playerIsNear && !this.dialogVisible;
            player.movementAllowed = !this.dialogVisible;
        }

        if (this.playerIsNear) {
            if (this.dialogVisible) {
                this.dialogs[0].draw(this.pos.x - 2, this.pos.y - 80);
            } else {
                this.bubble.draw(this.pos.x - 2, this.pos.y - 43);
            }
        }

        this.parent();
    }