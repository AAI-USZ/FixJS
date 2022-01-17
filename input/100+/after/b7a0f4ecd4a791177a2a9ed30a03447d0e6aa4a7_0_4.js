function() {
    $document = $(document)
    context = $('#game')[0].getContext('2d');
    $status = $('#status');
    room = new Room($status, [6,6]);
    player = new Player(room, [0,0], context);
    handleKeyCallback = function(ev) {
        handleKey(ev, player);
    };
    $('#reset').click(function() {
        player.reset();
        $status.text(" ");
    });
    $('#check').click(function() {
        $status.text("checking...");
        $document.unbind('keydown');
        room.reset();
        $status.text(hasSolution(player.room, [0,0]) ? 'yup!' : 'nope.');
        player.reset();
        $document.keydown(handleKeyCallback);
    });
    $document.keydown(handleKeyCallback);
}