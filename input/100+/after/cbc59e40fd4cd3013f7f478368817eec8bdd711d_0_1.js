function login(usuario, token){

      app.models.User.findOne({username:usuario, _id:token},function(err, dbuser){
        if(!dbuser){
          socket.end("Usuario && token no validos\r\n");
          socket.destroy()
          return;
        }else if (dbuser.connected){
          socket.end("Usuario ya esta conectado.\r\n");
          socket.destroy()
          return;
        }
        app.models.User.update({_id:token}, {connected:true},{},function(err){console.log("error updating "+err);});
        //autenticar usuario
        socket.user= usuario;//validar y asociar
        socket.ficha=undefined;
        socket.xIndex=undefined;
        socket.yIndex=undefined;
        socket.pow=1;
        socket.limitBombs=1;
        socket.contBombs=0;
        socket.points=0;//puntos por partida
        socket.token= token;//validando 
        socket.status=STATUS_WAITING;
        socket.dbuser= dbuser;
        socket.jugo=false;
        //cargar de la base de datos        
        socket.totalPrueba=dbuser.get("totalPrueba")||0;//puntos totales en pruebas
        socket.totalProduccion=dbuser.get("totalProduccion")||0;//puntos totales en produccion
        socket.partidasJugadas=dbuser.get("partidasJugadas")||0;//cargar informacion de la base de datos

        playersConnected.push(socket);
        console.log(usuario+" conectado");
      });
    }