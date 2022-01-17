function(data) {
        console.log(data)
        render(data.current_turn.board, data.template.width, data.template.height);
    }