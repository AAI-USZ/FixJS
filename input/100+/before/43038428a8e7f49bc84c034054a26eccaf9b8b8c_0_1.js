function(texto, x, y, centro_x, centro_y, escala_x, escala_y, rotacion) {
            this.texto = texto
            this.imagen = new Text(this.texto, "22px arial")
            this.imagen.textBaseline = "top"
            this.inicializar(x, y, centro_x, centro_y, escala_x, escala_y, rotacion)
            pilas.agregar_actor(this)
        }