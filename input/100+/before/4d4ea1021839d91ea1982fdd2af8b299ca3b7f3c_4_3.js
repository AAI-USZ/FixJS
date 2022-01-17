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
            $.each(data.items,function(index,elem){
               newData.push({
                   id: elem.id,
                   marca:elem.marca_auto_id,
                   tiempo:function(){
                       var fechaHoy=new Date()
                       var fecha=new Date(elem.fecha)
                       var diaOK=false
                       var anios= fechaHoy.getFullYear() - fecha.getFullYear()
                       if (anios == 0){
                        var mes=fechaHoy.getMonth() -fecha.getMonth()
                        if (mes==0){
                         var dia= fechaHoy.getDate() -fecha.getDate()
                         if (dia==0)
                            diaOK=true
                          }
                       }
                       if (diaOK){
                            
                       }else{

                       }return ((new Date().getTime() - new Date("T"+elem.horaFin))/60000) 


               },



                   status:this.tiempo>=elem.tarifa_id

               })
            })
            return newData
        }
    }, {})}