function prepare_game(users){
    if(typeof(config.users) == "undefined"){
      var newusers = {};
      $.each(users, function(id, user){
        newusers[user.nick] = {
          nick: user.nick,
          x: user.x,
          y: user.y,
          direction: user.direction,
          score: 0,
          color1: "#FFBD24",
          color2: "#FFF700"
        };
        log(newusers[user.nick]);
        users[id] = newusers[user.nick];
        log(newusers);
      });
      config.users = newusers;
      config.users_list = users;
    }
    ui_render_score_board(config.users_list);
    ui_show_screen("game");
    WebGLPrepare(config.users);
}