function(contexto) {
            contexto.save()

            contexto.translate(this.x, -this.y)
            singleton.get().camara.fijar_posicion(contexto)

            contexto.rotate(singleton.get().utils.convertir_a_radianes(this._rotacion))
            contexto.scale(this.escala_x, this.escala_y)
            contexto.translate(-this.centro_x, -this.centro_y)
            this.imagen.draw(contexto)

            contexto.restore()
        }