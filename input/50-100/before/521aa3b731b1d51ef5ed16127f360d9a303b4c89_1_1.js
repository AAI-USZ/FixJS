function(position) {
    $.post('https://spy-game.herokuapp.com/update_position', position, handle_update, 'json');
    $('#content').append('<p>You are within '+position.coords.accuracy+' meters of '+position.coords.latitude+', '+position.coords.longitude+'</p>');
}