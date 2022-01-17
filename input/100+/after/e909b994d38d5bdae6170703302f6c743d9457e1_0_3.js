function drawPlayers(){
    var canvas, context, image, width, height, x = 0, y = 0, numFrames = 15, frameSize = 30;
    var mul = 30;

    if(!spriteSheet) {
        spriteSheet  = new Image();
        spriteSheet.src = "./spritesheet.png";
    }
    image = spriteSheet;
        canvas = document.getElementById('players');
        context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        function drawPlayer(xpos,ypos,index){
            var indextemp;
            if(index==player.id){
                indextemp=0;
            }else{
                indextemp=7;
            }
            width = image.width;
            height = image.height;

            y = (indextemp-(indextemp%numFrames))/numFrames*frameSize;
            x = (indextemp%numFrames)*frameSize;


        context.drawImage(image, x, y, frameSize, frameSize, xpos*mul+3, ypos*mul+3, frameSize, frameSize);
    }
        for(var i=0;otherplayer.length>i;i++){
            if(otherplayer[i] && otherplayer[i].isAlive)
                drawPlayer(otherplayer[i].x,otherplayer[i].y,otherplayer[i].id);
        }
}