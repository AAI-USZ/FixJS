function(){
    turno++;
    for(var i=0; i<partida.jugadores;i++){
        //console.log("jugador "+partida[partida.lista[i]].id+" accion: "+partida[partida.lista[i]].accion);
        if(partida[partida.lista[i]].accion==undefined){
          //deberia echarlo
          //console.log("jugador "+partida[partida.lista[i]].id+" no juega: "+partida[partida.lista[i]].accion);
        }else{
         // console.log("jugador "+partida[partida.lista[i]].ficha+" accion: "+partida[partida.lista[i]].accion);
        }
    }
    //algun procesamiento
    controller.actualizarMapa();
    var map= controller.getMapa();
    for(var i=partida.jugadores-1; i>=0;i--){
        var player = partida[partida.lista[i]];
        if(player.status==STATUS_WAITING){
          console.log(player.user+" "+player.ficha+" muerto. total puntos: "+player.points);
          partida.lista.splice(i,1);
          partida.jugadores--;
        }else{
          if(partida.jugadores==1){
            player.addPuntos(WIN_POINTS);
            
            console.log(player.user+" "+player.ficha+" gano. total puntos: "+player.points);
            finalizoPartida=true;
          }
          player.accion=undefined;
          player.write("TURNO;"+turno+";"+map+";\r\n");
          player.jugo=false;
        }
    }
    //guardar el estado de la partida
    partida.juego.push(map);

    if(turno>=MAX_TURNOS||finalizoPartida){
      finalizoPartida=true;
      console.timeEnd('duracion partida');
      console.log("puntuacion total: ");
      
      partida.sort(function(a, b){return a.points-b.points});
      var userA=undefined;
      var userB=undefined;
      var userC=undefined;
      var userD=undefined;
      for(i in partida){
        console.log(partida[i].ficha+" "+ partida[i].user+" puntos: "+partida[i].points);
        if(i==0){
          partida[i].addPuntos(partida[i].points);
        }else if(i==1){
          partida[i].addPuntos(partida[i].points+5);
        }else if(i==2){
          partida[i].addPuntos(partida[i].points+8);
        }else if(i==3){
          partida[i].addPuntos(partida[i].points+13);
        }
        if(partida[i].ficha=="A"){
          userA = partida[i].user;
        }else if(partida[i].ficha=="B"){
          userB = partida[i].user;
        }else if(partida[i].ficha=="C"){ 
          userC = partida[i].user;
        }else if(partida[i].ficha=="D"){
          userD = partida[i].user;
        }
        partida[i].status=STATUS_WAITING;
      }

      var partidaStr="";
      var logFila="";
      var partidaTurno;
      for(var t=0;t<partida.juego.length;t++){
        partidaStr+=partida.juego[t];
        if(t<partida.juego.length-1){
          partidaStr+="-";
        }
        //console.log("turno "+turno)
      }
      console.log("jugador A es"+userA);

      var partidaModel = new app.models.Partida({ logPartida: partidaStr.toString(),
                                                  jugadorA:userA,
                                                  jugadorB:userB,
                                                  jugadorC:userC,
                                                  jugadorD:userD,
                                                  ganador:partida[3].user,
                                                  liga:"libreJulio"
                                                });
      partidaModel.save(function(err){console.log("error saving putio "+err)});
      console.log("se guardo")

      setTimeout(crearPartida,FREEZE_TIME);
    }else{
      setTimeout(jugarPartida,DURACION_TURNO);  
    }
  }