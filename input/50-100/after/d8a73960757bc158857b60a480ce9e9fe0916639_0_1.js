function(){
      if(socket.udata){
        socket.leave(socket.udata.sheet_id);
        es.remove_user_from_room(socket.udata, socket.udata.sheet_id);
        io.sockets.in(socket.udata.sheet_id).emit('USER_CHANGE', {user: socket.udata, action: 'LEFT', sheet_data:EtherSheetService.sheets[socket.udata.sheet_id]});
      }
    }