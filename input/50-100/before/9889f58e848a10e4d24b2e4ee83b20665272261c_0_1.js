function(event){
        console.debug("SERVER>" + event.data);
        var d = JSON.parse(event.data); // parse it

        if(d.type === "player.kickout"){
            gameIsOn = false; // not playing .. stop the refreshing and all the bazar ...
            alert("You have been kicked on in this window : " + d.args[0]);
            // redirect home ??
        }
    }