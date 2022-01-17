function(dx, dy) {
            if (dx === "centro")
                dx = this.imagen.image.width / 2

            if (dy === "centro")
                dy = this.imagen.image.height / 2

            this.centro_x = Math.round(dx)
            this.centro_y = Math.round(dy)
        }