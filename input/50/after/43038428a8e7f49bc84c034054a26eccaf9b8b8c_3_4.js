function(opciones) {
            this.modos = [];

            if (opciones.depuracion)
                this.modos.push(new ModoPuntoDeControl(this));
        }