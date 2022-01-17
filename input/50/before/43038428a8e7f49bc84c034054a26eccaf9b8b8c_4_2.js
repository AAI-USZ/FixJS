function(canvas){
            this.canvas = canvas
            this.click_de_mouse = new Evento()
            this.mueve_mouse = new Evento()

            this.conectar_eventos()
        }