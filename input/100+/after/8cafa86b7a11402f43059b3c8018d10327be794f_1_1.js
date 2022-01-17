function(){
               var nroPatente = this.element.find('input#patente').val()
               var marcaId = this.element.find('select#marcas').val()
              
				if ((nroPatente.length>0)){
                   var aux=new Array()
                  $.when(Estado.findAll({patente:nroPatente},
                   function(elem){
					   $.extend(aux,elem)
					})
				  ).done(function()
				 {new Stat('body',aux)})
                
                     

               
                }else{ Reg_estacionamiento.findAll({patente:nroPatente},function(elem){console.log(elem)})}
//               
              }