function(roomId,userId,date,message,userFriendlyRoomName){
        this.userFriendlyRoomName = userFriendlyRoomName;
        this.roomId     = roomId;
        this.userId     = userId;
        this.date       = date;
        this.message    = message;
        this.swarm("recordMsg");
        console.log("Got message: "+ message);
    }