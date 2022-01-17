function(index,elem){
               newData.push({
                   id: elem.id,
                   marca:elem.marca_auto_id,
                   tiempo:horas(elem.fecha,elem.horaFin)
                  
		   		})
            }