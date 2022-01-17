function(){
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


               }