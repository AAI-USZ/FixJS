function(callback) {
        if (user) {
          if (!curRoom || this.get("id") != curRoom.get("id")) {
            curRoom = new Model.CurrentRoom({id: this.get("id"), callback : callback });
          }
        } else {
          callback({status:false, message:"You haven't logged in yet"});
        }
      }