function (){
            saveChat(this.roomId,this.userId,this.date,this.message);
            this.swarm("notifyAll");
        }