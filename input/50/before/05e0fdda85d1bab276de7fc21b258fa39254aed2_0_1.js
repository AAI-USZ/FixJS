function pushPosition() {
    $.post('https://spy-game.herokuapp.com/games/'+document.game_id+'/update_position', last_loc, handle_update, 'json');
}