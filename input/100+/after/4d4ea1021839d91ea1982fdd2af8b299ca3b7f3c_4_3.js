function(){
 can.Model('Reg_estacionamiento',{
     /* @Static */

        findAll : 'GET /reg_estacionamientos',
        findOne : 'GET /reg_estacionamientos/{id}',
        create  : 'POST /reg_estacionamientos',
        update  : 'PUT /reg_estacionamientos/{id}',
        destroy : 'DELETE /reg_estacionamientos/{id}',
        models  : function(data){
            return data.items;
        }
        },
        /* @Prototype */
        {

        }


    ),
    
    can.Model("Estado",{
        findAll : 'GET /reg_estacionamientos',
        models  : function(data){
            var newData = new Array()
            function horas(elemFecha,horaFin){
				var fechaHoy=new Date()
                var fecha=new Date(elemFecha+'T'+horaFin)
                
                 //dif de años
                var anios= fechaHoy.getFullYear() - fecha.getFullYear()
                 //dif de meses, falla si no es el mismo año
                var meses=fechaHoy.getMonth() -fecha.getMonth()
                 //falla si no es la misma semana
                var dias= (fechaHoy.getDate()) - (fecha.getDate())
                //diferencia de minutos entre la fecha y hora de control con 
                //fecha y hora del fin de tarifa
                var minutos= ((fechaHoy.getTime()) - (fecha.getTime()))/60000 
			                       
		        return [anios,meses,dias,Math.round(minutos)]
				}
            $.each(data.items,function(index,elem){
               newData.push({
                   id: elem.id,
                   marca:elem.marca_auto_id,
                   tiempo:horas(elem.fecha,elem.horaFin)
                  
		   		})
            })
            return newData
        }
    }, {})}