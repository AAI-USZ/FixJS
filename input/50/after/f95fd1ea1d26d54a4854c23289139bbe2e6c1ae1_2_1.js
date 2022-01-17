function (){
            saveChat(this.roomId,this.userId,this.date,this.message);
            this.swarm("notifyAll");
            if(debug == true) {
                console.log(this.message);
            }
        }