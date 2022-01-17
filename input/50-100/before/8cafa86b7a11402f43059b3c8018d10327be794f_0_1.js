function( element , options ) {
              console.log(this.options[0].patente)
              this.element.append(can.view(url+'gadget/estadoUsuario/estadoUsuario.ejs'
                ,this.options))
              $.mobile.changePage($('#statusPage'))
               }