function(id, user){
        newusers[user.nick] = {
          nick: user.nick,
          x: user.x,
          y: user.y,
          direction: user.direction,
          score: 0,
          color1: "#FFFFFF",
          color2: "#000000"
        };
        log(newusers[user.nick]);
        users[id] = newusers[user.nick];
        log(newusers);
      }