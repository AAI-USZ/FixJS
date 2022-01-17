function(x, y, centro_x, centro_y, escala_x, escala_y, rotacion) {
            this.x = x || 0;
            this.y = y || 0;
            this.centro_x = centro_x || 0;
            this.centro_y = centro_y || 0;

            this.escala_x = escala_x || 1;
            this.escala_y = escala_y || 1;
            this._rotacion = rotacion || 0;
        }