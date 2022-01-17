function(imagen, x, y, centro_x, centro_y, escala_x, escala_y, rotacion) {
            imagen = imagen || "sin_imagen.png";

            this.imagen = this.cargar_imagen(imagen);
            this.inicializar(x, y, centro_x, centro_y, escala_x, escala_y, rotacion);

            this.centro_x = 16;
            this.centro_y = 16;
            singleton.get().agregar_actor(this);
        }