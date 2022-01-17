function(){
        //logs that you won
        logTime();
        log += " Winner";
        
        //Displays the end message to the player
        Crafty.background('#000');
        message = Crafty.e("2D, DOM, Text").attr({w: 400, h: 20, x: 200, y: 390})
                                           .text("!!!!   YOU WIN   !!!!")
                                           .css({"text-align": "center"});
    }