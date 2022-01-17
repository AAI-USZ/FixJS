function(index,elem){
               newData.push({
                   id: elem.id,
                   marca:elem.marca_auto_id,
                   fechaHora: new Date((elem.fecha).replace(" ","T")),
                   tiempo:this.fechaHora,
                       //((new Date())-(this.fechaHora))/60000,//obtener minutos ya q un minuto son 60000 milisegundos
                   status:this.tiempo>=elem.tarifa_id

               })
            }