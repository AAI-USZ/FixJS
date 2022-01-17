function(){
    if(playersConnected.length<2){
      console.log("esperando para lanzar una partida");
      setTimeout(crearPartida,5000);
      return undefined;
    }else{
      //iniciarPartida;
      //selecciona 4 jugadores siguiendo unas reglas
      console.log(playersConnected.length);
      controller.generarMapa();
      partida = [];//almacena los jugadores asociandolos por el id
      partida.lista=[];//ids de jugadores en esta partida
      if(playersConnected.length>=4){
        partida.jugadores= playersConnected.length;
      }else{
        partida.jugadores=4;  
      }
      partida.juego=[];
      playersConnected.sort(function(){
        return (Math.round(Math.random())-0.5); 
      });
      playersConnected.sort(function(a, b){
        return a.partidasJugadas-b.partidasJugadas
      });
      console.log("players connected "+playersConnected);
      for(var i =0; i<partida.jugadores;i++){
        partida[playersConnected[i].id]=playersConnected[i];
        partida.lista.push(playersConnected[i].id);
        controller.addPlayer(playersConnected[i]);
        app.models.User.update({_id:playersConnected[i].token},{partidasJugadas:playersConnected[i].partidasJugadas+1},{},function(err){console.log(""+err);});
      }
      turno=0;
      finalizoPartida=false;
      console.time('duracion partida');
      setTimeout(jugarPartida,DURACION_TURNO); 
    }
  }