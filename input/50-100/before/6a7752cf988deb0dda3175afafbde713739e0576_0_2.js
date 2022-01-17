function polling_wrapper() {
    $.getJSON(document.URL + '.json', null, function(data) {
        console.log(data)
        render(data.board, data.game_description.width, data.game_description.height);
    });
    setTimeout(polling_wrapper, 15000);
}