function play(position) {

    if (position != null) {
        var stateArray = state.split('');
        stateArray[position] = userIsX ? '3' : '1';
        state = stateArray.join('');
    }

    $.get('/game?q='+state, function(data) {

        var stateArray = data.split('');
        var stat = stateArray.shift();
        data = stateArray.join('');

        switch (stat) {
            case '0':
                // TODO: We might be playing as this mark?
                $('#game_outcome_msg').html('The computer wins.');
                $('#game_outcome').show();
                break;
            case '1':
                $('#game_outcome_msg').html('The computer wins.');
                $('#game_outcome').show();
                break;
            case '2':
                $('#game_outcome_msg').html('A draw.');
                $('#game_outcome').show();
                break;
            case '3':
                break;
        }
        state = data;
        render();
    });
}