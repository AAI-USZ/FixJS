function newRoom() {
    player = new Player(new Room([8,8]));
    $('#reset').click(function() {
        player.reset()
    });
}