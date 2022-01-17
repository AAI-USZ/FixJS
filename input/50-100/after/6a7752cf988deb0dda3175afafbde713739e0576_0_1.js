function() {
    polling_wrapper();

    $(".game_cell").hover(
        function() {$(this).css("background-color", "gray")}, 
        function() {$(this).css("background-color", "white")}
    );
}