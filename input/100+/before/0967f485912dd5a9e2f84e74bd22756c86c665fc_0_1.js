function prepare_game(users){
    if(typeof(config.users) == "undefined"){
      config.users = users;
      $.each(config.users, function(id, user){
        user.score = 0;
        user.color1 = "#FFBD24";
        user.color2 = "#FFF700";
      });
    }
    ui_render_score_board(config.users);
    ui_show_screen("game");
    WebGLPrepare(config.users);
}