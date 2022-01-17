function(id_canvas, prefijo_imagenes) {
        this.canvas = document.id(id_canvas);
        if (this.canvas === null)
          throw new Error("El elemento " + id_canvas + " no existe en la pagina");

        this.stage = new Stage(this.canvas);
        this.contexto = this.canvas.getContext("2d");
        this.lista_actores = [];
        this.camara = new camara.Camara(this.canvas);
        this.eventos = new eventos.Eventos(this.canvas);

        // carga de imagenes
        this.imagenes = new imagenes.Imagenes(prefijo_imagenes);
        this.depurador = new depurador.Depurador(this);

        this.utils = new utils.Utils();
        //this.fisica = new fisica.Fisica()
        singleton.set(this);
        Ticker.setFPS(60);
        Ticker.addListener(this);
      }