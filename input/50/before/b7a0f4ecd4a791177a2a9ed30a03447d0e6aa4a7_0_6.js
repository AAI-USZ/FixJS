function() {
    ctx = $('#game')[0].getContext('2d');
    $('#new').click(newRoom);
    $(document).keydown(handleKey);
    newRoom();
}