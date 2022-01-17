function() {
    polling_wrapper();

    $(".gameCell").hover(
        function() {$(this).css("background-color", "gray")}, 
        function() {$(this).css("background-color", "white")}
    );
}