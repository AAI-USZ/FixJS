function polling_wrapper() {
    $.getJSON(document.URL + '.json', null, function(data) {
        console.log(data)
        render(data.current_turn.board, data.template.width, data.template.height);
    });
    
    setTimeout(polling_wrapper, 15000);
}