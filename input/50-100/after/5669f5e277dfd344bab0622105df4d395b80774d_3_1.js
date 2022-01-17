function(closeCursor){
      closeCursor = closeCursor || (!collection.db.openCalled);
      if(!closeCursor){
        cursor.nextObject(callHandler);
      }else{
        cursor.close(function(){
          if(endHandler) endHandler(_cursor);
        });
      }
    }