function(c) {

        this._limpiar(c);
        this.depurador.comienza_dibujado();
        //this.fisica.actualizar();

        for (var i=0; i<this.lista_actores.length; i++) {
          var actor = this.lista_actores[i];
          actor.actualizar();
          actor.dibujar(c);
          this.depurador.dibuja_al_actor(actor);
        }

        this.depurador.termina_dibujado();

      }