function () {
      // template data, if any, is available in 'this'
       var player = Players.find(this._id).fetch()[0];
       console.log("You pressed the button on player:"+player.name+" id"+this._id);
       Session.set("selected_player", this._id);
       Session.set("team1_action", "main");

    }