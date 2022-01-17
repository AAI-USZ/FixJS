function(msg){
            console.log("Out:")
            console.log(msg)
            sock.send(JSON.stringify(msg));
        }