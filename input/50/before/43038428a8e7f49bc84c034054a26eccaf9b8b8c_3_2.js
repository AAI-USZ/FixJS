function(actor){
            var posicion = this.pilas.camara.obtener_posicion()
            this.dibujar_cruz(this.g, posicion.x + actor.x, posicion.y - actor.y)
        }