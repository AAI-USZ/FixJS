function(position) {
    $.post('https://spy-game.herokuapp.com/games/'+document.game_id+'/update_position', position, handle_update, 'json');
}