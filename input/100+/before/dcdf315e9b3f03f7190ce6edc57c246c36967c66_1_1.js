function() {
    $("#hello").click(login);
    $("#screen_room_btn_start").click(start_game);
    $("#create_room_btn").click(function(){
        var capacity = parseInt($("#create_room_capacity").val());
        create_room(capacity);
        $("#create_room_capacity").val("");
    });

    $("#room_list_refresh_btn").click(function(){
      refresh_room_list();
    });
    $("#about_btn").click(ui_show_about);



    $('#nick').keypress(function(e){
      if(e.which == 13){
       $('#hello').click();
       }
    });
    $('#create_room_capacity').keypress(function(e){
      if(e.which == 13){
       $('#create_room_btn').click();
       }
    });
}